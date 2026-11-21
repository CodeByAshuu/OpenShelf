# OpenShelf – Ansible Configuration & Deployment

Automated provisioning and application deployment for OpenShelf on AWS EC2 (Ubuntu 24.04 LTS) using Ansible and Docker Compose.

---

## Architecture Overview

```
                      Ansible Control Node (WSL2 / Local)
                                      │
                         SSH (via ~/.ssh/openshelf-aws)
                                      │
                                      ▼
                        AWS EC2 (Ubuntu 24.04 Noble)
      ┌───────────────────────────────────────────────────────────────┐
      │  systemd: openshelf.service (Auto-starts on system boot)       │
      │                                                               │
      │  Docker Compose Stack (/opt/openshelf)                        │
      │  ├── frontend (Nginx on :80) ──> Serves React SPA (Vite)     │
      │  └── backend  (Node.js on :5000) ──> Express API             │
      │       ├── /health endpoint                                    │
      │       ├── Local Uploads Volume (uploads_data)                 │
      │       ├── MongoDB Atlas (Managed Cloud DB)                    │
      │       └── Cloudinary (Cloud Media Assets)                     │
      └───────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
devops/ansible/
├── ansible.cfg                    # Ansible default configuration (inventory, SSH settings, roles path)
├── inventory.ini                  # Target EC2 instance inventory
├── playbook.yml                   # Main orchestration playbook
├── group_vars/
│   └── all/
│       ├── vars.yml               # Non-sensitive variables (paths, ports, deploy options)
│       └── vault.example.yml      # Template for sensitive credentials (MongoDB, JWT, Cloudinary)
├── roles/
│   ├── docker/                    # Role: Installs Docker CE & Docker Compose plugin
│   │   ├── tasks/main.yml
│   │   └── handlers/main.yml
│   └── openshelf/                 # Role: App deployment, environment, systemd service
│       ├── tasks/main.yml
│       ├── templates/
│       │   ├── server.env.j2              # Backend .env template
│       │   ├── docker-compose.override.yml.j2  # Injects dynamic public EC2 IP into frontend build
│       │   └── openshelf.service.j2       # systemd unit for automatic restart on reboot
│       └── handlers/main.yml
└── README.md                      # Complete execution and troubleshooting documentation
```

---

## Prerequisites

1. **Ansible**: Installed on your control node (`ansible [core >= 2.16]`).
2. **SSH Key**: Key pair generated at `~/.ssh/openshelf-aws` (private key permissions: `chmod 600 ~/.ssh/openshelf-aws`).
3. **AWS Infrastructure**: Provisioned via Terraform (`cd ../terraform && terraform apply`).

---

## Step-by-Step Deployment Guide

### 1. Configure Inventory with EC2 Public IP

Obtain the public IP from Terraform:
```bash
cd /mnt/c/Users/ASUS/Documents/PROJECTS/2\ Ongoing\ Projects/Ebook/devops/terraform
terraform output -raw instance_public_ip
```

Switch to the Ansible directory:
```bash
cd ../ansible
```

Update `inventory.ini` with your instance IP:
```ini
[openshelf]
openshelf_server ansible_host=YOUR_EC2_PUBLIC_IP ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/openshelf-aws
```

*(Tip: You can update it automatically with a single command):*
```bash
sed -i "s/ansible_host=[^ ]*/ansible_host=$(terraform -chdir=../terraform output -raw instance_public_ip)/" inventory.ini
```

---

### 2. Configure Application Secrets Securely

Create your private secrets file from the template:
```bash
cp group_vars/all/vault.example.yml group_vars/all/vault.yml
```

Edit `group_vars/all/vault.yml` with your actual MongoDB Atlas and Cloudinary credentials:
```yaml
vault_jwt_secret: "your_super_secret_jwt_key"
vault_mongodb_uri: "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority"
vault_cloudinary_cloud_name: "your_cloud_name"
vault_cloudinary_api_key: "your_api_key"
vault_cloudinary_api_secret: "your_api_secret"
```

Encrypt the file with Ansible Vault:
```bash
ansible-vault encrypt group_vars/all/vault.yml
```
*(Enter a vault password when prompted. `group_vars/all/vault.yml` is protected by `.gitignore` and will never be committed to Git).*

---

### 3. Verify SSH Connectivity

Test connection to the EC2 server:
```bash
ansible -m ping openshelf
```

Expected output:
```json
openshelf_server | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

---

### 4. Validate Playbook Syntax

Ensure playbook files and templates pass syntax validation:
```bash
ansible-playbook playbook.yml --syntax-check
```

---

### 5. Execute Deployment Playbook

#### Full Deployment (Docker setup + OpenShelf application):
```bash
# If using encrypted vault:
ansible-playbook playbook.yml --ask-vault-pass

# If vault.yml is unencrypted for local testing:
ansible-playbook playbook.yml
```

#### Selective Execution by Tags:
- **System and Docker configuration only**:
  ```bash
  ansible-playbook playbook.yml --tags docker
  ```
- **Application deployment and container updates only**:
  ```bash
  ansible-playbook playbook.yml --tags app
  ```

---

## Deployment Verification

Once Ansible finishes, verify each layer:

### 1. Health Endpoints & URLs
```bash
# Check Backend Health Endpoint (HTTP 200 {"status":"ok"})
curl http://<EC2_PUBLIC_IP>:5000/health

# Check Frontend Nginx Response (HTTP 200)
curl -I http://<EC2_PUBLIC_IP>/
```

### 2. Docker Container Status
Log into the EC2 instance:
```bash
ssh -i ~/.ssh/openshelf-aws ubuntu@<EC2_PUBLIC_IP>

docker compose -f /opt/openshelf/docker-compose.yml ps
```
Both `openshelf-frontend` and `openshelf-backend` should show `Up` and `healthy`.

### 3. Systemd Service & Auto-Restart on Boot
The playbook registers `/etc/systemd/system/openshelf.service`. Check its state:
```bash
sudo systemctl status openshelf
```

Test automatic recovery across reboots:
```bash
sudo reboot
```
Wait 45 seconds, reconnect via SSH, and check:
```bash
docker compose -f /opt/openshelf/docker-compose.yml ps
```
The containers will have resumed automatically without manual intervention.

---

## Security Best Practices Implemented

1. **No Hardcoded Secrets**: Secrets are isolated in Ansible Vault (`vault.yml`) and templated to `/opt/openshelf/server/.env` with strict `0600` permissions.
2. **Task Masking (`no_log: true`)**: Sensitive environment variable updates do not leak in standard Ansible execution logs or CI outputs.
3. **Principle of Least Privilege**: Containers run with non-root user permissions where configured, and Docker socket access is limited to the `docker` group.
4. **Clean Code Transfer**: File synchronization automatically excludes `node_modules`, `.git`, `.env`, and Terraform state files, preventing accidental disclosure and keeping transfer sizes tiny.
