# OpenShelf – Terraform Infrastructure

Provisions the AWS infrastructure for OpenShelf on a single Ubuntu 24.04 EC2 instance in `ap-southeast-2` (Sydney).

## Architecture

```
Internet
    │
    ▼
Internet Gateway
    │
    ▼
Public Subnet (10.0.1.0/24)   ← VPC 10.0.0.0/16
    │
    ▼
Security Group
  • SSH  :22   ← your IP only
  • HTTP :80   ← 0.0.0.0/0
  • HTTPS:443  ← 0.0.0.0/0
    │
    ▼
EC2 (Ubuntu 24.04, IMDSv2, encrypted EBS, Docker pre-installed)
```

## Files

| File | Purpose |
|---|---|
| `main.tf` | Terraform + provider config |
| `variables.tf` | All input variables with descriptions |
| `locals.tf` | Computed local values (prefix, common tags) |
| `data.tf` | Ubuntu 24.04 LTS AMI data source (Canonical) |
| `resources.tf` | VPC, subnet, IGW, route table, SG, key pair, EC2 |
| `outputs.tf` | Useful values after apply |
| `user_data.sh.tpl` | Bootstrap script – installs Docker on first boot |
| `terraform.tfvars` | Your variable values (**gitignored** – not committed) |
| `.terraform.lock.hcl` | Provider lock file (**committed** for reproducibility) |

## Prerequisites

| Tool                 | Required version                                   |
|----------------------|----------------------------------------------------|
| Terraform            | ≥ 1.17.0                                           |
| AWS CLI              | ≥ 2.x, configured with `default` profile           |
| SSH key              | `~/.ssh/openshelf-aws` (private) + `.pub` (public) |

Ensure your AWS CLI is on `$PATH` in WSL:
```bash
# Check
aws sts get-caller-identity

# If not found, add snap to PATH
echo 'export PATH="$PATH:/snap/bin"' >> ~/.bashrc && source ~/.bashrc
```

## Setup

```bash
# 1. Enter the terraform directory (from WSL)
cd /mnt/c/Users/ASUS/Documents/PROJECTS/2\ Ongoing\ Projects/Ebook/devops/terraform

# 2. Review / edit your variables
#    my_public_ip is pre-filled; update if your IP changes
nano terraform.tfvars

# 3. Format – fix whitespace and style
terraform fmt

# 4. Download providers
terraform init

# 5. Validate config
terraform validate
```

## Deployment

```bash
# Review what will be created (safe – no changes made)
terraform plan

# Apply after review (you will be prompted to type 'yes')
terraform apply

# Or auto-approve (use with care)
terraform apply -auto-approve
```

After apply, the outputs show:
```
instance_public_ip  = "x.x.x.x"
ssh_command         = "ssh -i ~/.ssh/openshelf-aws ubuntu@x.x.x.x"
```

## Connecting to the Instance

```bash
ssh -i ~/.ssh/openshelf-aws ubuntu@<instance_public_ip>

# Docker is ready after ~2 min (user data runs on first boot)
docker version
docker compose version
```

## Deploying OpenShelf

```bash
# On the EC2 instance:
# 1. Clone the repo
git clone https://github.com/<your-org>/openshelf.git
cd openshelf

# 2. Create server/.env with real secrets
cp server/.env.example server/.env
nano server/.env

# 3. Run with Docker Compose
docker compose up --build -d
```

## Destroying Infrastructure

```bash
# Always destroy from the same directory / workspace
terraform destroy

# Or to skip the prompt
terraform destroy -auto-approve
```

> **Warning:** `terraform destroy` permanently deletes the EC2 instance and all associated resources. Data on the root EBS volume will be lost. Ensure the application state is backed up first.

## Changing Your Public IP (SSH Access)

If your ISP assigns a new IP:
```bash
# 1. Find new IP
curl https://checkip.amazonaws.com

# 2. Update terraform.tfvars
my_public_ip = "new.ip.here/32"

# 3. Apply only the security group change
terraform apply -target=aws_security_group.openshelf
```

## Cost Estimate

| Resource | Type | Est. monthly (ap-southeast-2) |
|---|---|---|
| EC2 | t3.micro | ~\$9 USD |
| EBS root | 20 GiB gp3 | ~\$1.60 USD |
| VPC / IGW / SG | — | Free |
| Data transfer | varies | — |

> Switch to `t2.micro` for AWS Free Tier eligibility (12 months, 750 h/month).

## Security Notes

- SSH is restricted to `my_public_ip` only — not open to the world
- IMDSv2 is enforced (prevents SSRF-based metadata theft)
- EBS root volume is AES-256 encrypted at rest
- Private key `~/.ssh/openshelf-aws` is never committed; `.gitignore` excludes it
- `terraform.tfvars` is gitignored to avoid leaking your IP or any future secrets
- The `.terraform.lock.hcl` **is** committed for reproducible provider versions
