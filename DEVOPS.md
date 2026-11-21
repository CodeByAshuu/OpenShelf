# OpenShelf – DevOps Master Guide: Terraform, Ansible & Nagios

Comprehensive end-to-end guide explaining the architecture, configuration, and execution of the complete DevOps pipeline for the **OpenShelf** full-stack application.

---

## Table of Contents

1. [Pipeline Overview & Architecture](#1-pipeline-overview--architecture)
2. [Prerequisites & Environment Setup](#2-prerequisites--environment-setup)
3. [Phase 1: Terraform (Infrastructure as Code)](#3-phase-1-terraform-infrastructure-as-code)
   - [What is Provisioned](#what-is-provisioned)
   - [File Breakdown](#terraform-file-breakdown)
   - [Step-by-Step Execution](#running-terraform)
4. [Phase 2: Ansible (Configuration Management & Deployment)](#4-phase-2-ansible-configuration-management--deployment)
   - [What is Configured](#what-is-configured)
   - [Role Architecture](#ansible-role-architecture)
   - [Secret Management with Ansible Vault](#secret-management-with-ansible-vault)
   - [Step-by-Step Execution](#running-ansible)
5. [Phase 3: Nagios (Infrastructure & Service Monitoring)](#5-phase-3-nagios-infrastructure--service-monitoring)
   - [Monitoring Architecture](#monitoring-architecture)
   - [Checks & Plugins Configured](#checks--plugins-configured)
   - [Step-by-Step Execution](#running-nagios)
6. [Complete End-to-End Cheatsheet](#6-complete-end-to-end-cheatsheet)
7. [Teardown & Cleanup](#7-teardown--cleanup)

---

## 1. Pipeline Overview & Architecture

The OpenShelf DevOps workflow follows a three-stage lifecycle:

```
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                         STAGE 1: TERRAFORM                              │
  │  Provisions AWS Cloud Infrastructure in ap-southeast-2 (Sydney)         │
  │  VPC (10.0.0.0/16) ──> Public Subnet ──> IGW ──> SG ──> EC2 Ubuntu 24.04│
  └────────────────────────────────────┬────────────────────────────────────┘
                                       │ Public IP & SSH Output
                                       ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                          STAGE 2: ANSIBLE                               │
  │  Configures EC2 Server & Deploys Containerized Application              │
  │  Install Docker CE ──> Add User to Group ──> Sync Project ──>           │
  │  Inject Vault Secrets ──> docker compose up -d ──> Enable systemd Unit  │
  └────────────────────────────────────┬────────────────────────────────────┘
                                       │ Deployed Endpoints (:80, :5000)
                                       ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                          STAGE 3: NAGIOS                                │
  │  Continuous Monitoring of Host & Application Health                     │
  │  Host PING ──> SSH (:22) ──> Frontend HTTP (:80) ──> Backend (/health)  │
  └─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Prerequisites & Environment Setup

All commands are designed to run from **WSL2 (Ubuntu 24.04)** or a standard Linux environment.

| Component | Minimum Version | Verification Command |
|---|---|---|
| **Terraform** | 1.17.x | `terraform version` |
| **AWS CLI** | 2.x (configured with credentials) | `aws sts get-caller-identity` |
| **Ansible** | core 2.16+ | `ansible --version` |
| **Docker** | Engine 24+ & Compose v2 | `docker compose version` |
| **SSH Key** | ed25519 or RSA | `ls -la ~/.ssh/openshelf-aws*` |

If you need to generate the SSH key pair:
```bash
ssh-keygen -t ed25519 -f ~/.ssh/openshelf-aws -C "openshelf-aws"
chmod 600 ~/.ssh/openshelf-aws
```

---

## 3. Phase 1: Terraform (Infrastructure as Code)

Located in [`devops/terraform/`](file:///c:/Users/ASUS/Documents/PROJECTS/2%20Ongoing%20Projects/Ebook/devops/terraform/).

### What is Provisioned

1. **Virtual Private Cloud (VPC)**:
   - CIDR block: `10.0.0.0/16` with DNS hostnames and DNS resolution enabled.
2. **Internet Gateway (IGW)**:
   - Attached to the VPC to enable two-way public internet communication.
3. **Public Subnet**:
   - CIDR block: `10.0.1.0/24` in `ap-southeast-2a` with auto-assigned public IP addresses.
4. **Route Table**:
   - Directs all outbound traffic (`0.0.0.0/0`) through the Internet Gateway.
5. **Security Group (`openshelf-dev-sg`)**:
   - **SSH (port 22)**: Strictly restricted to your public IP (`my_public_ip/32`).
   - **HTTP (port 80)**: Open to `0.0.0.0/0` for web traffic.
   - **HTTPS (port 443)**: Open to `0.0.0.0/0` for secure SSL traffic.
   - **All Egress**: Open to `0.0.0.0/0` (required for package updates, Docker images, MongoDB Atlas, and Cloudinary).
6. **Key Pair**:
   - Registers your public key (`~/.ssh/openshelf-aws.pub`) on AWS.
7. **EC2 Instance**:
   - **OS**: Ubuntu 24.04 LTS (Noble Numbat) via official Canonical AMI data source.
   - **Instance Type**: Configurable (`t3.micro` by default, or `t2.micro` for Free Tier).
   - **Security**: EC2 Instance Metadata Service v2 (IMDSv2) enforced (`http_tokens = "required"`).
   - **Storage**: 20 GiB `gp3` root volume, **encrypted at rest**.
   - **User Data**: Bootstraps Docker Engine and Docker Compose plugin on initial boot.

### Terraform File Breakdown

| File | Description |
|---|---|
| [`main.tf`](file:///c:/Users/ASUS/Documents/PROJECTS/2%20Ongoing%20Projects/Ebook/devops/terraform/main.tf) | Terraform version & AWS provider requirements. |
| [`variables.tf`](file:///c:/Users/ASUS/Documents/PROJECTS/2%20Ongoing%20Projects/Ebook/devops/terraform/variables.tf) | Configurable input variables with documentation and defaults. |
| [`data.tf`](file:///c:/Users/ASUS/Documents/PROJECTS/2%20Ongoing%20Projects/Ebook/devops/terraform/data.tf) | Dynamic lookup of latest Canonical Ubuntu 24.04 AMI. |
| [`locals.tf`](file:///c:/Users/ASUS/Documents/PROJECTS/2%20Ongoing%20Projects/Ebook/devops/terraform/locals.tf) | Shared naming prefix (`openshelf-dev`) and resource tags. |
| [`resources.tf`](file:///c:/Users/ASUS/Documents/PROJECTS/2%20Ongoing%20Projects/Ebook/devops/terraform/resources.tf) | Core AWS infrastructure resources. |
| [`outputs.tf`](file:///c:/Users/ASUS/Documents/PROJECTS/2%20Ongoing%20Projects/Ebook/devops/terraform/outputs.tf) | Outputs public IP, instance ID, and SSH command. |
| [`user_data.sh.tpl`](file:///c:/Users/ASUS/Documents/PROJECTS/2%20Ongoing%20Projects/Ebook/devops/terraform/user_data.sh.tpl) | Shell script executed on first boot to bootstrap Docker. |
| [`terraform.tfvars`](file:///c:/Users/ASUS/Documents/PROJECTS/2%20Ongoing%20Projects/Ebook/devops/terraform/terraform.tfvars) | Variable values (contains your public IP; gitignored). |
| [`.terraform.lock.hcl`](file:///c:/Users/ASUS/Documents/PROJECTS/2%20Ongoing%20Projects/Ebook/devops/terraform/.terraform.lock.hcl) | Provider lock file ensuring deterministic provider builds. |

---

### Running Terraform

Navigate to the terraform directory:
```bash
cd devops/terraform
```

#### Step 1: Format and Validate
```bash
terraform fmt
terraform init
terraform validate
```

#### Step 2: Plan
Review the resources that will be created:
```bash
terraform plan
```
*Expected: `Plan: 8 to add, 0 to change, 0 to destroy.`*

#### Step 3: Apply
Provision the AWS infrastructure:
```bash
terraform apply
```
*(Type `yes` when prompted).*

#### Step 4: Extract Outputs
Once complete, note the outputs:
```bash
terraform output -raw instance_public_ip
terraform output -raw ssh_command
```

Test direct SSH connection:
```bash
ssh -i ~/.ssh/openshelf-aws ubuntu@$(terraform output -raw instance_public_ip)
```

---

## 4. Phase 2: Ansible (Configuration Management & Deployment)

Located in [`devops/ansible/`](file:///c:/Users/ASUS/Documents/PROJECTS/2%20Ongoing%20Projects/Ebook/devops/ansible/).

### What is Configured

1. **Host Preparation**: Updates apt repositories and ensures essential tools (`curl`, `gnupg`, `rsync`, `tar`) are installed.
2. **Docker Installation (`roles/docker`)**: Idempotently installs official Docker CE and Compose plugin, starts and enables `docker.service`, and adds `ubuntu` to the `docker` group.
3. **Application Synchronization (`roles/openshelf`)**: Synchronizes application code to `/opt/openshelf` while excluding unnecessary files (`node_modules`, `.git`, `.env`, build artifacts).
4. **Secure Secret Injection**: Renders `server/.env` using Ansible Vault secrets with strict `0600` permissions.
5. **Dynamic Frontend URL Injection**: Generates `docker-compose.override.yml` to supply the EC2 Public IP (`http://<EC2_PUBLIC_IP>:5000`) as Vite's build argument (`VITE_API_URL`).
6. **Container Orchestration**: Executes `docker compose up -d --build --remove-orphans`.
7. **Reboot Persistence**: Deploys and enables `/etc/systemd/system/openshelf.service` so containers automatically restart on host reboot.
8. **Health Check Validation**: Verifies that `http://localhost:5000/health` and `http://localhost:80/` return HTTP 200.

### Ansible Role Architecture

```
devops/ansible/
├── ansible.cfg                    # Default inventory, SSH, and privilege escalation settings
├── inventory.ini                  # Target host definition
├── playbook.yml                   # Main playbook
├── group_vars/
│   └── all/
│       ├── vars.yml               # Non-sensitive variables (paths, ports, mode)
│       ├── vault.example.yml      # Credentials template
│       └── vault.yml              # Real encrypted secrets (gitignored)
└── roles/
    ├── docker/                    # Docker installation & service management
    │   ├── tasks/main.yml
    │   └── handlers/main.yml
    └── openshelf/                 # Application build, deployment, and systemd unit
        ├── tasks/main.yml
        ├── templates/
        │   ├── server.env.j2              # Backend .env template
        │   ├── docker-compose.override.yml.j2  # Injects VITE_API_URL
        │   └── openshelf.service.j2       # systemd unit
        └── handlers/main.yml
```

---

### Secret Management with Ansible Vault

Never hardcode credentials into Git. Ansible Vault encrypts sensitive variables:

1. Copy the example vault template:
   ```bash
   cd devops/ansible
   cp group_vars/all/vault.example.yml group_vars/all/vault.yml
   ```
2. Edit `group_vars/all/vault.yml` with your real MongoDB Atlas and Cloudinary credentials:
   ```yaml
   vault_jwt_secret: "your_super_strong_jwt_secret"
   vault_mongodb_uri: "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"
   vault_cloudinary_cloud_name: "your_cloud_name"
   vault_cloudinary_api_key: "your_api_key"
   vault_cloudinary_api_secret: "your_api_secret"
   ```
3. Encrypt the file:
   ```bash
   ansible-vault encrypt group_vars/all/vault.yml
   ```
   *(To edit later, run: `ansible-vault edit group_vars/all/vault.yml`)*

---

### Running Ansible

Navigate to the ansible directory:
```bash
cd devops/ansible
```

#### Step 1: Update Inventory with Terraform Output
Automatically sync the EC2 public IP into `inventory.ini`:
```bash
sed -i "s/ansible_host=[^ ]*/ansible_host=$(terraform -chdir=../terraform output -raw instance_public_ip)/" inventory.ini
```

#### Step 2: Verify SSH Connectivity
```bash
export ANSIBLE_CONFIG=ansible.cfg
ansible -m ping openshelf
```
*Expected: `openshelf_server | SUCCESS => { "ping": "pong" }`*

#### Step 3: Check Playbook Syntax
```bash
ansible-playbook -i inventory.ini playbook.yml --syntax-check
```

#### Step 4: Execute Playbook
Run the complete provisioning and deployment:
```bash
# If group_vars/all/vault.yml is encrypted:
ansible-playbook -i inventory.ini playbook.yml --ask-vault-pass

# If vault.yml is unencrypted for local testing:
ansible-playbook -i inventory.ini playbook.yml
```

#### Step 5: Verify Deployment
After Ansible finishes:
```bash
# Verify Backend Health Endpoint (HTTP 200 {"status":"ok"})
curl http://$(terraform -chdir=../terraform output -raw instance_public_ip):5000/health

# Verify Frontend HTTP response (HTTP 200)
curl -I http://$(terraform -chdir=../terraform output -raw instance_public_ip)/
```

---

## 5. Phase 3: Nagios (Infrastructure & Service Monitoring)

Located in [`devops/nagios/`](file:///c:/Users/ASUS/Documents/PROJECTS/2%20Ongoing%20Projects/Ebook/devops/nagios/).

### Monitoring Architecture

Nagios Core runs natively on the OpenShelf EC2 instance, provisioned and configured completely via Ansible (`roles/nagios`).

```
       Operator Browser (Authorized Public IP)
                       │
       HTTP (:8080) with Basic Authentication (htpasswd)
                       │
                       ▼
       Nagios Core 4.x on EC2 Host (Ubuntu 24.04 LTS)
         ├── Website Availability Check (HTTP :80)
         ├── Backend Express API Health Check (HTTP :5000 /health)
         ├── Nginx Port Availability Check (TCP :80)
         ├── Docker Daemon Systemd Service Check (systemctl is-active)
         ├── Frontend Container Status & Health (openshelf-frontend)
         ├── Backend Container Status & Health (openshelf-backend)
         ├── System CPU Load Average (check_load)
         ├── System RAM Utilization % (check_mem.sh)
         └── Root EBS Disk Space Utilization (check_disk)
```

### Checks & Plugins Configured

All checks are organized inside [`devops/nagios/conf.d/`](file:///c:/Users/ASUS/Documents/PROJECTS/2%20Ongoing%20Projects/Ebook/devops/nagios/conf.d/) and deployed to `/etc/nagios4/conf.d/`:

| Service | Plugin / Command | Warning | Critical | Purpose |
|---|---|---|---|---|
| **Website Availability** | `check_http -H localhost -p 80` | Non-2xx/3xx | Connection refused | Verifies React SPA is served on port 80 |
| **Backend API Health** | `check_http -H localhost -p 5000 -u /health -s "ok"` | Non-200 | Body missing `"ok"` | Verifies Express API & MongoDB connection |
| **Nginx Web Server** | `check_tcp -H localhost -p 80` | Timeout > 5s | Connection refused | Ensures web server port is listening |
| **Docker Daemon** | `check_service.sh docker` | — | Service inactive | Verifies systemd `docker.service` is active |
| **Frontend Container** | `check_docker.sh openshelf-frontend` | Starting | Stopped / Exited | Monitors `openshelf-frontend` container lifecycle |
| **Backend Container** | `check_docker.sh openshelf-backend` | Starting | Unhealthy / Exited | Monitors `openshelf-backend` container lifecycle & health |
| **CPU Load Average** | `check_load -w 5.0,4.0,3.0 -c 10.0,8.0,6.0` | Load > 5.0 | Load > 10.0 | Monitors 1m, 5m, and 15m CPU load average |
| **Memory Utilization** | `check_mem.sh -w 80 -c 90` | ≥ 80% used | ≥ 90% used | Tracks Linux RAM consumption from `/proc/meminfo` |
| **Root Disk Utilization** | `check_disk -w 20% -c 10% -p /` | < 20% free | < 10% free | Prevents out-of-disk crashes on the root volume |

---

### Running & Deploying Nagios via Ansible

Nagios installation and configuration is integrated into the Ansible orchestration playbook.

#### Step 1: Configure Nagios Password in Vault
In `devops/ansible/group_vars/all/vault.yml`:
```yaml
vault_nagios_admin_password: "YourSecurePassword123!"
```
*(Encrypt with `ansible-vault encrypt devops/ansible/group_vars/all/vault.yml` if not already encrypted).*

#### Step 2: Deploy Nagios via Ansible
Deploy only the Nagios monitoring stack:
```bash
cd devops/ansible
export ANSIBLE_CONFIG=ansible.cfg
ansible-playbook -i inventory.ini playbook.yml --tags nagios --ask-vault-pass
```

Or deploy as part of the full stack execution:
```bash
ansible-playbook -i inventory.ini playbook.yml --ask-vault-pass
```

#### Step 3: Access the Nagios Web Interface
Open your web browser:
- **URL**: `http://<EC2_PUBLIC_IP>:8080/nagios4/`
- **Username**: `nagiosadmin`
- **Password**: The password configured in `vault.yml`

*Security note: Port 8080 is restricted in the AWS Security Group to your operator IP (`var.my_public_ip`), and protected by HTTP Basic Authentication.*

---

## 6. Complete End-to-End Cheatsheet

Run this sequence to provision, deploy, and monitor the entire project from scratch:

```bash
# ── 1. PROVISION INFRASTRUCTURE (Terraform) ──
cd devops/terraform
terraform init
terraform apply -auto-approve
EC2_IP=$(terraform output -raw instance_public_ip)
echo "EC2 Public IP: $EC2_IP"

# ── 2. CONFIGURE & DEPLOY APPLICATION & MONITORING (Ansible) ──
cd ../ansible
sed -i "s/ansible_host=[^ ]*/ansible_host=${EC2_IP}/" inventory.ini
cp group_vars/all/vault.example.yml group_vars/all/vault.yml
# Edit vault.yml with real credentials (MongoDB, Cloudinary, Nagios admin password), then run:
export ANSIBLE_CONFIG=ansible.cfg
ansible -m ping openshelf
ansible-playbook -i inventory.ini playbook.yml --ask-vault-pass

# ── 3. VERIFY DEPLOYMENT & DASHBOARDS ──
echo "OpenShelf App : http://${EC2_IP}/"
echo "Backend Health: http://${EC2_IP}:5000/health"
echo "Nagios Monitor: http://${EC2_IP}:8080/nagios4/"
```

---

## 7. Teardown & Cleanup

To avoid unnecessary AWS cloud charges after completing tests or demonstrations:

```bash
# Destroy all AWS Infrastructure
cd devops/terraform
terraform destroy -auto-approve
```
