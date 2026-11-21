# OpenShelf – Nagios Core Monitoring

Production-conscious system and service monitoring for OpenShelf on AWS EC2 (Ubuntu 24.04 LTS), automated with Ansible.

---

## Table of Contents

- [Overview](#overview)
- [Monitored Services & Thresholds](#monitored-services--thresholds)
- [Directory Layout](#directory-layout)
- [Architecture & Security](#architecture--security)
- [Automated Deployment via Ansible](#automated-deployment-via-ansible)
- [Accessing the Nagios Web Dashboard](#accessing-the-nagios-web-dashboard)
- [Alerts & Notification Handling](#alerts--notification-handling)
- [Manual Verification & Troubleshooting](#manual-verification--troubleshooting)

---

## Overview

Nagios Core runs natively on the OpenShelf EC2 instance to monitor:
1. External & internal HTTP/TCP service availability.
2. The Node.js Express backend health status.
3. The host systemd Docker daemon.
4. Active Docker container states and internal container healthchecks.
5. System-level CPU load, memory utilization, and disk space with warning and critical thresholds.

The web interface is hosted on a dedicated Apache VirtualHost (`:8080`) to ensure port `80` remains 100% dedicated to OpenShelf's Nginx frontend container.

---

## Monitored Services & Thresholds

All checks are defined in [`conf.d/openshelf_services.cfg`](conf.d/openshelf_services.cfg) and [`conf.d/commands.cfg`](conf.d/commands.cfg):

| Service | Plugin / Check Command | Warning | Critical | Purpose |
|---|---|---|---|---|
| **Website Availability** | `check_http -H localhost -p 80` | Non-2xx/3xx | Connection refused / timeout | Verifies OpenShelf frontend is reachable via HTTP |
| **Backend API Health** | `check_http -H localhost -p 5000 -u /health -s "ok"` | Non-200 | Body missing `"ok"` | Verifies Express server and MongoDB Atlas connection |
| **Nginx Service Status** | `check_tcp -H localhost -p 80` | Timeout > 5s | Connection refused | Ensures web server port is listening |
| **Docker Daemon Status** | `check_service.sh docker` | — | Service inactive / stopped | Verifies systemd `docker.service` is active |
| **Frontend Container** | `check_docker.sh openshelf-frontend` | Starting | Stopped / Exited | Monitors `openshelf-frontend` container lifecycle |
| **Backend Container** | `check_docker.sh openshelf-backend` | Starting | Unhealthy / Exited | Monitors `openshelf-backend` container lifecycle & health |
| **CPU Load Average** | `check_load -w 5.0,4.0,3.0 -c 10.0,8.0,6.0` | Load > 5.0 | Load > 10.0 | Monitors 1m, 5m, and 15m CPU load average |
| **Memory Utilization** | `check_mem.sh -w 80 -c 90` | ≥ 80% used | ≥ 90% used | Tracks Linux RAM consumption from `/proc/meminfo` |
| **Root Disk Utilization** | `check_disk -w 20% -c 10% -p /` | < 20% free | < 10% free | Prevents out-of-disk crashes on the root EBS volume |

---

## Directory Layout

```
devops/nagios/
├── conf.d/
│   ├── commands.cfg             # Check commands & notification command definitions
│   ├── contacts.cfg             # Nagios admin contact & contactgroup definitions
│   ├── openshelf_server.cfg     # Host definition for the EC2 server (127.0.0.1)
│   ├── openshelf_services.cfg   # All 9 service definitions with check intervals
│   └── templates.cfg            # Host & service inheritance templates
├── plugins/
│   ├── check_docker.sh          # Custom plugin inspecting docker container status & health
│   ├── check_mem.sh             # Custom plugin calculating RAM usage % with perfdata
│   └── check_service.sh         # Custom plugin checking systemctl is-active status
└── README.md                    # Documentation
```

---

## Architecture & Security

### 1. Dual-Port Web Architecture
- **Port 80**: Dedicated exclusively to `openshelf-frontend` (Docker Nginx container).
- **Port 8080**: Dedicated to Apache2 serving Nagios Core web interface & CGIs.

### 2. Multi-Layer Web UI Protection
The Nagios dashboard is protected at two distinct layers:
1. **Network Firewall (AWS Security Group)**:
   In `devops/terraform/resources.tf`, port `8080` ingress is strictly limited to `var.my_public_ip` (your operator IP). It is never open to the public internet (`0.0.0.0/0`).
2. **Application Authentication (HTTP Basic Auth)**:
   Apache requires password authentication against `/etc/nagios4/htpasswd.users`. The password is encrypted in Ansible Vault (`vault_nagios_admin_password`) and never committed in plaintext.

---

## Automated Deployment via Ansible

Nagios installation and configuration is completely integrated into the Ansible orchestration pipeline:

### 1. Configure Password in Ansible Vault
Ensure `vault_nagios_admin_password` is configured in `devops/ansible/group_vars/all/vault.yml`:
```yaml
vault_nagios_admin_password: "YourSecurePassword123!"
```
*(Encrypt with `ansible-vault encrypt devops/ansible/group_vars/all/vault.yml` if not already encrypted).*

### 2. Run Ansible Playbook
Deploy only Nagios:
```bash
cd /mnt/c/Users/ASUS/Documents/PROJECTS/2\ Ongoing\ Projects/Ebook/devops/ansible
export ANSIBLE_CONFIG=ansible.cfg
ansible-playbook -i inventory.ini playbook.yml --tags nagios --ask-vault-pass
```

Or run as part of the full stack deployment:
```bash
ansible-playbook -i inventory.ini playbook.yml --ask-vault-pass
```

Ansible automatically:
- Installs `nagios4`, `nagios4-cgi`, `monitoring-plugins`, and `apache2`.
- Reconfigures Apache to port `8080` (freeing port `80`).
- Generates `/etc/nagios4/htpasswd.users` with restricted `0640` permissions.
- Adds `nagios` to the `docker` group for non-root container inspection.
- Deploys custom plugins to `/usr/lib/nagios/plugins/`.
- Deploys Nagios configuration files to `/etc/nagios4/conf.d/`.
- Validates the configuration using `nagios4 -v /etc/nagios4/nagios.cfg`.
- Enables and starts `nagios4` and `apache2` systemd services.

---

## Accessing the Nagios Web Dashboard

1. Obtain your EC2 Public IP from Terraform:
   ```bash
   cd devops/terraform && terraform output -raw instance_public_ip
   ```
2. Open your browser and navigate to:
   ```
   http://<EC2_PUBLIC_IP>:8080/nagios4/
   ```
3. Enter your credentials when prompted:
   - **Username**: `nagiosadmin`
   - **Password**: The password configured in `vault.yml`

### Dashboard Navigation:
- Click **Hosts** in the left navigation to inspect the `openshelf-server` status.
- Click **Services** to view real-time green `OK` statuses across all 9 monitors.
- Click **Service Problems** to inspect any active warnings or critical alerts.

---

## Alerts & Notification Handling

- **Contact**: `nagiosadmin` (`admin@openshelf.local`).
- **Notification Period**: `24x7`.
- **Host Alerts**: Trigger on Down (`d`), Unreachable (`u`), and Recovery (`r`).
- **Service Alerts**: Trigger on Warning (`w`), Critical (`c`), Unknown (`u`), and Recovery (`r`).
- **Alert Logging**: In `commands.cfg`, alert notifications are piped to the system logger (`/usr/bin/logger -t nagios-service-alert`), enabling auditing via `journalctl -t nagios-service-alert` or integration with external log shippers.

---

## Manual Verification & Troubleshooting

To manually verify Nagios status on the EC2 host:

```bash
# 1. SSH into the instance
ssh -i ~/.ssh/openshelf-aws ubuntu@<EC2_PUBLIC_IP>

# 2. Check Nagios service status
sudo systemctl status nagios4

# 3. Check Apache status on port 8080
sudo ss -tulpn | grep 8080
sudo systemctl status apache2

# 4. Verify Nagios configuration syntax
sudo nagios4 -v /etc/nagios4/nagios.cfg

# 5. Test custom plugins directly as the nagios user
sudo -u nagios /usr/lib/nagios/plugins/check_docker.sh openshelf-frontend
sudo -u nagios /usr/lib/nagios/plugins/check_docker.sh openshelf-backend
sudo -u nagios /usr/lib/nagios/plugins/check_mem.sh -w 80 -c 90
sudo -u nagios /usr/lib/nagios/plugins/check_service.sh docker
```
