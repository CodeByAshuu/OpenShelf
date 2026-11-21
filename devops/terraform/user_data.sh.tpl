#!/bin/bash
# User data script – runs once on first boot as root.
# Installs Docker Engine + Docker Compose plugin on Ubuntu 24.04.
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive

echo "=== Updating apt packages ==="
apt-get update -y
apt-get upgrade -y

echo "=== Installing Docker prerequisites ==="
apt-get install -y ca-certificates curl gnupg lsb-release

echo "=== Adding Docker GPG key and repository ==="
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" \
  > /etc/apt/sources.list.d/docker.list

echo "=== Installing Docker Engine ==="
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "=== Configuring Docker ==="
systemctl enable docker
systemctl start docker

# Allow ubuntu user to run docker without sudo
usermod -aG docker ubuntu

echo "=== ${project_name} bootstrap complete ==="
echo "Docker version: $(docker --version)"
echo "Docker Compose version: $(docker compose version)"
