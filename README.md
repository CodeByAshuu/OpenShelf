# OpenShelf 📚

> A modern, full-stack eBook discovery and reading platform built with **React 19**, **Node.js/Express**, **MongoDB Atlas**, **Cloudinary**, and automated with a complete **DevOps pipeline** (Docker Compose, Terraform, Ansible, and Nagios).

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started Locally](#getting-started-locally)
  - [Prerequisites](#prerequisites)
  - [Method 1: Docker Compose (Recommended)](#method-1-docker-compose-recommended)
  - [Method 2: Standalone Local Development](#method-2-standalone-local-development)
- [Environment Variables](#environment-variables)
- [DevOps & Cloud Deployment](#devops--cloud-deployment)
  - [Terraform (AWS Infrastructure)](#1-terraform-infrastructure-as-code)
  - [Ansible (Configuration & Deployment)](#2-ansible-configuration-management)
  - [Nagios (Health Monitoring)](#3-nagios-monitoring)
- [API Reference](#api-reference)
- [License](#license)

---

## Overview

OpenShelf is an end-to-end full-stack web application designed for browsing, searching, and managing eBooks and user reading profiles. In addition to application functionality, OpenShelf includes an enterprise-grade academic DevOps workflow that provisions AWS infrastructure with Terraform, configures and deploys Dockerized services using Ansible, and monitors system and service health with Nagios.

---

## Key Features

- **User Authentication**: Secure signup, login, and JWT-based session protection with hashed passwords (`bcryptjs`).
- **User Profile Management**: Edit profile bios, display creation dates, and upload custom avatars (Multer disk storage / Cloudinary).
- **eBook Catalog**: Explore recommended books, best sellers, detailed book previews, and categories.
- **Responsive UI**: Built with Tailwind CSS v4 and Lucide React icons for seamless mobile and desktop experiences.
- **Containerized Architecture**: Multi-stage Docker builds for client (Nginx) and server (Node.js Alpine) with automated health checks.
- **Automated Cloud Deployment**: Fully reproducible AWS Sydney (`ap-southeast-2`) deployment via Terraform and Ansible.
- **Active Monitoring**: Nagios Core tracking ICMP ping, SSH, frontend HTTP, and backend API `/health`.

---

## Tech Stack

### Frontend (`client/`)
- **React 19** with **Vite 7**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **React Router Dom v7**
- **Axios** (API requests)
- **Lucide React** & **React Icons**
- **Nginx Alpine** (Production web server & reverse proxy)

### Backend (`server/`)
- **Node.js 20** & **Express 5**
- **MongoDB Atlas** with **Mongoose 8**
- **JWT (JSON Web Tokens)** for authentication
- **Multer** for multipart file uploads
- **Cloudinary** integration for cloud media assets
- **Dotenv** & **CORS**

### DevOps & Infrastructure (`devops/`)
- **Docker & Docker Compose**: Multi-stage container builds, non-root users, volume persistence, bridge networking.
- **Terraform 1.17.x**: Infrastructure as Code on AWS (VPC, public subnet, IGW, route table, security group, IMDSv2, encrypted EBS, EC2 Ubuntu 24.04).
- **Ansible core 2.16+**: Automated configuration management, Docker installation, Ansible Vault secrets, and systemd service management.
- **Nagios Core 4.x**: Containerized monitoring for host availability and service uptime.

---

## Architecture

```
                    Internet / User Browser
                              │
               ┌──────────────┴──────────────┐
               │ :80 (HTTP)                  │ :5000 (API)
               ▼                             ▼
   ┌───────────────────────┐     ┌───────────────────────┐
   │   Frontend (Nginx)    │     │    Backend (Express)  │
   │   React 19 SPA        │────>│    Node.js Alpine     │
   └───────────────────────┘     └───────────┬───────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
             MongoDB Atlas (Cloud DB)                    Cloudinary (Media)
```

---

## Project Structure

```
Ebook/
├── client/                        # React Frontend (Vite + Tailwind v4)
│   ├── src/                       # Components, Pages, Assets
│   ├── Dockerfile                 # Multi-stage Vite build -> Nginx Alpine
│   ├── nginx.conf                 # SPA routing and cache headers
│   ├── .dockerignore
│   └── package.json
│
├── server/                        # Express API Backend
│   ├── config/                    # Database configurations
│   ├── controllers/               # Business logic (user, ebook)
│   ├── middleware/                # JWT auth verification
│   ├── models/                    # Mongoose schemas (User, Ebook)
│   ├── routes/                    # Express route handlers
│   ├── uploads/                   # Local uploads directory
│   ├── Dockerfile                 # Slim Node.js Alpine runtime (non-root)
│   ├── .dockerignore
│   ├── .env.example               # Secrets template (safe to commit)
│   └── package.json
│
├── devops/                        # DevOps & Cloud Automation
│   ├── terraform/                 # AWS Infrastructure as Code
│   │   ├── main.tf, resources.tf, variables.tf, outputs.tf
│   │   └── README.md              # Terraform-specific guide
│   ├── ansible/                   # Configuration Management & Deployment
│   │   ├── playbook.yml, inventory.ini, ansible.cfg
│   │   ├── roles/ (docker, openshelf)
│   │   └── README.md              # Ansible-specific guide
│   └── nagios/                    # Health & Uptime Monitoring
│       ├── docker-compose.yml     # Containerized Nagios Core
│       ├── conf.d/openshelf.cfg   # Service & host checks
│       └── README.md              # Nagios-specific guide
│
├── docker-compose.yml             # Local & Production container orchestration
├── .dockerignore                  # Global Docker build exclusions
├── .gitignore                     # Git ignore rules (secrets, state, keys)
├── DEVOPS.md                      # Complete master guide for DevOps lifecycle
└── README.md                      # Main project documentation
```

---

## Getting Started Locally

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for containerized mode)
- [Node.js 20+](https://nodejs.org/) & `npm` (for standalone local dev)

---

### Method 1: Docker Compose (Recommended)

Run the complete multi-service application with a single command:

1. **Configure backend environment**:
   ```bash
   cp server/.env.example server/.env
   # Add your real MongoDB Atlas connection string in server/.env
   ```

2. **Build and start containers**:
   ```bash
   docker compose up --build
   ```

3. **Access services**:
   - **Frontend**: [http://localhost:80](http://localhost:80)
   - **Backend API**: [http://localhost:5000](http://localhost:5000)
   - **Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

To run in detached mode:
```bash
docker compose up -d --build
docker compose logs -f
```

To stop containers:
```bash
docker compose down
```

---

### Method 2: Standalone Local Development

If you prefer to run client and server independently:

#### 1. Backend Setup:
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB credentials
npm run dev
# Server starts on port 5000
```

#### 2. Frontend Setup:
```bash
cd ../client
npm install
npm run dev
# Vite dev server runs at http://localhost:5173
```

---

## Environment Variables

### Backend (`server/.env`)

| Variable | Description | Example / Default |
|---|---|---|
| `PORT` | Express listening port | `5000` |
| `JWT_SECRET` | Secret key for signing auth tokens | `supersecretkey` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/openshelf` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | `your_api_key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | `your_api_secret` |

### Frontend (`client/.env`)

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Base URL of backend API | `http://localhost:5000` (Local / Docker) |

---

## DevOps & Cloud Deployment

OpenShelf provides a complete, production-conscious automated deployment pipeline. For full walkthroughs, architecture diagrams, and command runbooks, see **[DEVOPS.md](DEVOPS.md)**.

### 1. Terraform (Infrastructure as Code)
Provisions a dedicated VPC, public subnet, Internet Gateway, route table, security group, and an Ubuntu 24.04 EC2 instance in Sydney (`ap-southeast-2`):
```bash
cd devops/terraform
terraform init
terraform plan
terraform apply
```

### 2. Ansible (Configuration Management)
Installs Docker, creates non-root users, syncs project files, templates secure environment variables via Ansible Vault, starts containers with Docker Compose, and sets up a systemd service (`openshelf.service`) for automatic restart on server reboot:
```bash
cd devops/ansible
sed -i "s/ansible_host=[^ ]*/ansible_host=$(terraform -chdir=../terraform output -raw instance_public_ip)/" inventory.ini
ansible-playbook -i inventory.ini playbook.yml
```

### 3. Nagios (Monitoring)
Spins up a lightweight Nagios Core dashboard to actively monitor host reachability (PING), SSH (:22), frontend HTTP (:80), and backend health (:5000/health):
```bash
cd devops/nagios
sed -i "s/address .*/address $(terraform -chdir=../terraform output -raw instance_public_ip)/" conf.d/openshelf.cfg
docker compose up -d
# View dashboard at http://localhost:8080 (nagiosadmin / nagiosadmin123)
```

---

## API Reference

### Health
- `GET /health` — Returns status of backend service (`{"status":"ok"}`).

### Users & Authentication
- `POST /api/users/register` — Register a new user (`name`, `email`, `password`).
- `POST /api/users/login` — Authenticate and receive JWT token.
- `GET /api/users/profile` — Fetch current user profile (requires `Bearer <token>`).
- `PUT /api/users/profile` — Update user name, bio, and avatar image.

### eBooks
- `GET /api/ebooks` — Check ebook route status.

---

## License

This project is licensed under the ISC License.
