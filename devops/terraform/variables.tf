# ── Project ─────────────────────────────────────────────────────────────────
variable "project_name" {
  description = "Short project identifier used in resource names and tags."
  type        = string
  default     = "openshelf"
}

variable "environment" {
  description = "Deployment environment (dev, staging, prod)."
  type        = string
  default     = "dev"
}

# ── Region ──────────────────────────────────────────────────────────────────
variable "aws_region" {
  description = "AWS region to deploy resources into."
  type        = string
  default     = "ap-southeast-2"
}

# ── Networking ──────────────────────────────────────────────────────────────
variable "vpc_cidr" {
  description = "CIDR block for the VPC."
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block for the public subnet."
  type        = string
  default     = "10.0.1.0/24"
}

variable "availability_zone" {
  description = "Availability zone for the public subnet."
  type        = string
  default     = "ap-southeast-2a"
}

# ── Access control ──────────────────────────────────────────────────────────
variable "my_public_ip" {
  description = "Your public IP in CIDR notation (e.g. 203.0.113.42/32). SSH is restricted to this IP."
  type        = string
  # No default – must be supplied via terraform.tfvars or -var flag.
}

variable "ssh_public_key_path" {
  description = "Path to the SSH public key file to register as an EC2 key pair."
  type        = string
  default     = "~/.ssh/openshelf-aws.pub"
}

# ── Compute ──────────────────────────────────────────────────────────────────
variable "instance_type" {
  description = "EC2 instance type. t3.micro is not Free Tier in ap-southeast-2; t2.micro is Free Tier eligible."
  type        = string
  default     = "t3.micro"
}

variable "root_volume_size_gb" {
  description = "Root EBS volume size in GiB."
  type        = number
  default     = 20
}
