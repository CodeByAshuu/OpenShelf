# OpenShelf – Complete Project Startup & Operation Guide

> **A step-by-step, beginner-friendly guide** to starting, running, and managing the OpenShelf project both **locally on your computer** and on **AWS EC2 cloud infrastructure**.

---

## Table of Contents

1. [Understanding the Two Environments](#1-understanding-the-two-environments)
2. [Method A: Quick Local Start (Your Computer)](#2-method-a-quick-local-start-your-computer)
3. [Method B: Complete AWS Cloud Startup (Terraform + Ansible + Nagios)](#3-method-b-complete-aws-cloud-startup-terraform--ansible--nagios)
   - [Step 1: Start Docker Desktop](#step-1-start-docker-desktop)
   - [Step 2: Open WSL (Ubuntu)](#step-2-open-wsl-ubuntu)
   - [Step 3: Navigate to Project Root](#step-3-navigate-to-project-root)
   - [Step 4: Start Local Containers (Optional/Development)](#step-4-start-local-containers-optionaldevelopment)
   - [Step 5: Open AWS Management Console](#step-5-open-aws-management-console)
   - [Step 6: Navigate to EC2 Instances](#step-6-navigate-to-ec2-instances)
   - [Step 7: Start the EC2 Instance](#step-7-start-the-ec2-instance)
   - [Step 8: Wait for Status Checks (2/2 Passed)](#step-8-wait-for-status-checks-22-passed)
   - [Step 9: Copy Current Public IPv4 Address](#step-9-copy-current-public-ipv4-address)
   - [Step 10: Update IP in `inventory.ini`](#step-10-update-ip-in-inventoryini)
   - [Step 11: Navigate to `devops/terraform`](#step-11-navigate-to-devopsterraform)
   - [Step 12: Refresh Terraform & Update Security Group](#step-12-refresh-terraform--update-security-group)
   - [Step 13: Navigate to `devops/ansible`](#step-13-navigate-to-devopsansible)
   - [Step 14: Test Connection with Ansible Ping](#step-14-test-connection-with-ansible-ping)
   - [Step 15: Run the Ansible Playbook](#step-15-run-the-ansible-playbook)
   - [Step 16: Verify the Web App in Your Browser](#step-16-verify-the-web-app-in-your-browser)
   - [Step 17: Verify the Nagios Dashboard](#step-17-verify-the-nagios-dashboard)
   - [Step 18: Confirm Container & Monitoring Health](#step-18-confirm-container--monitoring-health)
4. [Graceful Shutdown (When Finished)](#4-graceful-shutdown-when-finished)
5. [Troubleshooting & Common Questions](#5-troubleshooting--common-questions)

---

## 1. Understanding the Two Environments

| Feature | Local Environment (Docker Desktop) | Cloud Environment (AWS EC2) |
|---|---|---|
| **Where it runs** | Your laptop / desktop via Docker | AWS Sydney (`ap-southeast-2`) on an Ubuntu 24.04 EC2 instance |
| **Purpose** | Fast local development, UI testing, instant edits | Real production deployment, automated CI/CD, DevOps pipeline |
| **Frontend URL** | [http://localhost:3000](http://localhost:3000) (or port 80) | `http://<EC2_PUBLIC_IP>/` (Port 80) |
| **Backend Health**| [http://localhost:5000/health](http://localhost:5000/health) | `http://<EC2_PUBLIC_IP>:5000/health` |
| **Monitoring** | Optional local container | **Nagios Core** at `http://<EC2_PUBLIC_IP>:8080/nagios4/` |
| **Cost** | Free (Local machine) | Uses AWS EC2 resources (stop when done) |

---

## 2. Method A: Quick Local Start (Your Computer)

If you only want to run and test the application on your own computer without using AWS:

1. **Start Docker Desktop** on Windows. Ensure the Docker icon in your system tray shows *"Engine running"*.
2. **Open Terminal** (PowerShell or WSL).
3. **Navigate to the project root**:
   ```bash
   cd "C:\Users\ASUS\Documents\PROJECTS\2 Ongoing Projects\Ebook"
   ```
4. **Start the containers**:
   ```bash
   docker compose up -d
   ```
5. **Open in your browser**:
   - **Frontend Web App**: **[http://localhost:3000](http://localhost:3000)** *(Port 3000 prevents conflicts with any local Windows Apache/XAMPP on port 80)*.
   - **Backend API Health**: **[http://localhost:5000/health](http://localhost:5000/health)**.
6. **Stop when done**:
   ```bash
   docker compose down
   ```

---

## 3. Method B: Complete AWS Cloud Startup (Terraform + Ansible + Nagios)

Follow these exact 18 steps to bring up the full cloud infrastructure, deploy the application, and enable Nagios monitoring:

### Step 1: Start Docker Desktop
Launch Docker Desktop from your Windows Start Menu (required if building images locally or testing local containers).

### Step 2: Open WSL (Ubuntu)
Open your Windows Terminal and select **Ubuntu** (or type `wsl` in PowerShell).

### Step 3: Navigate to Project Root
```bash
cd "/mnt/c/Users/ASUS/Documents/PROJECTS/2 Ongoing Projects/Ebook"
```

### Step 4: Start Local Containers (Optional/Development)
If you wish to have the local version running side-by-side:
```bash
docker compose up -d
```
Verify local status:
```bash
docker compose ps
```

---

### Step 5: Open AWS Management Console
Open your web browser and sign in to the **[AWS Management Console](https://console.aws.amazon.com/)**.
Ensure your region is set to **Sydney (`ap-southeast-2`)** in the top-right navbar.

### Step 6: Navigate to EC2 Instances
In the search bar at the top, type `EC2` and click **EC2**, then click **Instances** in the left menu.

### Step 7: Start the EC2 Instance
1. Find your instance named `openshelf-dev-server` (ID: `i-09f08587d77589ada`).
2. If the **Instance state** is *Stopped*:
   - Select the instance checkbox.
   - Click **Instance state** → **Start instance**.

### Step 8: Wait for Status Checks (2/2 Passed)
Refresh the console every 30 seconds until:
- **Instance state**: `Running` (green).
- **Status check**: `2/2 checks passed`.

### Step 9: Copy Current Public IPv4 Address
Click on the instance name to open its details. Copy the **Public IPv4 address** (e.g. `13.211.126.157`).

> ℹ️ **Important Note**: Whenever an AWS EC2 instance without an Elastic IP is stopped and started, AWS assigns it a **new** public IP address. Always check the fresh IP!

---

### Step 10: Update IP in `inventory.ini`
In WSL, update the IP in your Ansible inventory:

```bash
cd "/mnt/c/Users/ASUS/Documents/PROJECTS/2 Ongoing Projects/Ebook/devops/ansible"

# Replace <NEW_IP> with the copied IP address, for example:
sed -i "s/ansible_host=[^ ]*/ansible_host=13.211.126.157/" inventory.ini
```

Or open `inventory.ini` in nano/code and paste the IP:
```ini
[openshelf]
openshelf_server ansible_host=13.211.126.157 ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/openshelf-aws
```

---

### Step 11: Navigate to `devops/terraform`
```bash
cd "/mnt/c/Users/ASUS/Documents/PROJECTS/2 Ongoing Projects/Ebook/devops/terraform"
```

### Step 12: Refresh Terraform & Update Security Group
Your internet service provider (ISP) may have changed your home/office public IP. Terraform needs your current public IP so the AWS Security Group allows you to connect via SSH and access Nagios.

1. **Check your current public IP**:
   ```bash
   curl -s https://checkip.amazonaws.com
   ```
   *(Example output: `210.89.39.237`)*

2. **Update `terraform.tfvars`** with your current IP:
   ```hcl
   my_public_ip = "210.89.39.237/32"
   ```

3. **Run `terraform apply`** to update the security group:
   ```bash
   terraform apply
   ```
   - Review the plan (it will show `0 to add, 1 to change, 0 to destroy`).
   - Type `yes` when prompted.

---

### Step 13: Navigate to `devops/ansible`
```bash
cd "/mnt/c/Users/ASUS/Documents/PROJECTS/2 Ongoing Projects/Ebook/devops/ansible"
```

### Step 14: Test Connection with Ansible Ping
Make sure Ansible can communicate with the EC2 instance over SSH:

```bash
export ANSIBLE_CONFIG=ansible.cfg
ansible all -i inventory.ini -m ping
```

**Expected output:**
```json
openshelf_server | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```
If you see `"ping": "pong"`, your SSH key, security group, and IP configuration are 100% correct!

---

### Step 15: Run the Ansible Playbook
Now deploy Docker, the OpenShelf app containers, and the native Nagios monitoring stack:

```bash
ansible-playbook -i inventory.ini playbook.yml
```

*(If you encrypted `group_vars/all/vault.yml` with `ansible-vault`, add `--ask-vault-pass`)*.

Ansible will automatically:
1. Update Ubuntu packages on EC2.
2. Install Docker CE & Docker Compose plugin.
3. Synchronize your latest application source code to `/opt/openshelf`.
4. Template your secure `.env` file with MongoDB Atlas & Cloudinary credentials.
5. Build and launch `openshelf-frontend` and `openshelf-backend` containers.
6. Register the systemd unit `openshelf.service` so containers automatically restart if the server ever reboots.
7. Install Nagios Core 4.x and Apache on dedicated port `8080`.
8. Configure all 9 monitoring checks and start `nagios4.service`.

---

### Step 16: Verify the Web App in Your Browser
Open your browser and navigate to:
```
http://<EC2_PUBLIC_IP>/
```
*(Example: `http://13.211.126.157/`)*

You should see the OpenShelf storefront and navigation bar.

Test the backend API directly:
```
http://<EC2_PUBLIC_IP>:5000/health
```
*(Expected response: `{"status":"ok"}`)*

---

### Step 17: Verify the Nagios Dashboard
Open your browser and navigate to:
```
http://<EC2_PUBLIC_IP>:8080/nagios4/
```
*(Example: `http://13.211.126.157:8080/nagios4/`)*

When prompted for authentication:
- **Username**: `nagiosadmin`
- **Password**: The password defined in your vault (default: `nagiosadmin123`)

Click on **Services** in the left sidebar. You will see green **`OK`** indicators across all 9 monitors:
1. `OpenShelf Website Availability` (HTTP :80)
2. `Backend API Health Endpoint` (HTTP :5000 `/health`)
3. `Nginx Web Server Port` (TCP :80)
4. `Docker Daemon Service` (systemd active)
5. `Frontend Container (openshelf-frontend)` (Docker inspect healthy)
6. `Backend Container (openshelf-backend)` (Docker inspect healthy)
7. `CPU Load Average` (System load)
8. `Memory Utilization` (RAM %)
9. `Root Disk Space Utilization` (EBS free space %)

---

### Step 18: Confirm Container & Monitoring Health
SSH into your EC2 instance from WSL to inspect everything directly on the server:

```bash
ssh -i ~/.ssh/openshelf-aws ubuntu@<EC2_PUBLIC_IP>
```

Run these quick inspection commands on the server:
```bash
# Check running Docker containers:
docker compose -f /opt/openshelf/docker-compose.yml ps

# Check OpenShelf systemd auto-restart service:
sudo systemctl status openshelf

# Check Nagios monitoring service:
sudo systemctl status nagios4

# Check Apache listening on port 8080:
sudo ss -tulpn | grep 8080
```

---

## 4. Graceful Shutdown (When Finished)

To prevent unwanted AWS cloud billing when you are not using or demonstrating the project:

### 1. Stop the EC2 Instance from AWS Console
1. Go to **AWS Console** → **EC2** → **Instances**.
2. Select `openshelf-dev-server`.
3. Click **Instance state** → **Stop instance** *(NOT Terminate!)*.
4. Wait until the instance state changes to **Stopped**.

> ⚠️ **CRITICAL RULE**: 
> - **DO NOT click "Terminate instance"**.
> - **DO NOT run `terraform destroy`**.
> Stopping the instance keeps all your files, Docker containers, configuration, and disk state intact, but halts hourly compute charges. When you start it again next time, everything resumes immediately.

### 2. Keep Your Secrets & State Safe
- Never delete `devops/terraform/terraform.tfstate`.
- Keep your SSH private key `~/.ssh/openshelf-aws` safe and never share it.

### 3. Stop Local Containers (if running)
```bash
cd "/mnt/c/Users/ASUS/Documents/PROJECTS/2 Ongoing Projects/Ebook"
docker compose down
```

---

## 5. Troubleshooting & Common Questions

### Q1: `ssh: connect to host ... port 22: Connection timed out` or Ansible ping fails?
**Cause**: Your home or mobile internet IP address changed. The AWS Security Group only permits SSH and Nagios from your authorized IP.
**Fix**:
1. Check your new IP: `curl https://checkip.amazonaws.com`
2. Update `my_public_ip = "YOUR_NEW_IP/32"` in `devops/terraform/terraform.tfvars`.
3. Run `terraform apply -auto-approve` in `devops/terraform`.
4. Re-test: `ansible all -i inventory.ini -m ping` in `devops/ansible`.

---

### Q2: EC2 Public IP changed after stopping and starting?
**Cause**: AWS EC2 standard public IPs change upon every stop/start cycle.
**Fix**:
1. Copy the new IP from AWS Console.
2. Update `inventory.ini` in `devops/ansible/`:
   ```bash
   sed -i "s/ansible_host=[^ ]*/ansible_host=<NEW_IP>/" inventory.ini
   ```
3. Re-run `ansible-playbook -i inventory.ini playbook.yml` to re-synchronize and point the frontend build to the new IP.

---

### Q3: On Windows localhost, port 80 shows an Apache / XAMPP dashboard?
**Cause**: Windows has a native Apache or IIS service running on port 80.
**Fix**: Use port **`3000`** locally! Open **[http://localhost:3000](http://localhost:3000)**. The project is pre-configured with `3000:80` port mapping to bypass port 80 collisions.
