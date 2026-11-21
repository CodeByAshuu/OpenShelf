# ── VPC ──────────────────────────────────────────────────────────────────────
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = local.common_tags
}

# ── Internet Gateway ─────────────────────────────────────────────────────────
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = local.common_tags
}

# ── Public Subnet ─────────────────────────────────────────────────────────────
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidr
  availability_zone       = var.availability_zone
  map_public_ip_on_launch = true

  tags = merge(local.common_tags, { Name = "${local.prefix}-public-subnet" })
}

# ── Route Table ───────────────────────────────────────────────────────────────
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = merge(local.common_tags, { Name = "${local.prefix}-public-rt" })
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# ── Security Group ────────────────────────────────────────────────────────────
resource "aws_security_group" "openshelf" {
  name        = "${local.prefix}-sg"
  description = "OpenShelf EC2 security group: SSH from my IP, HTTP/HTTPS from anywhere"
  vpc_id      = aws_vpc.main.id

  # SSH – restricted to operator IP only
  ingress {
    description = "SSH from operator"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.my_public_ip]
  }

  # HTTP – for initial setup and Let's Encrypt challenge
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # All egress allowed (pulling Docker images, MongoDB Atlas, Cloudinary, apt)
  egress {
    description = "All outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.common_tags
}

# ── SSH Key Pair ──────────────────────────────────────────────────────────────
resource "aws_key_pair" "openshelf" {
  key_name   = "${local.prefix}-key"
  public_key = file(var.ssh_public_key_path)

  tags = local.common_tags
}

# ── EC2 Instance ──────────────────────────────────────────────────────────────
resource "aws_instance" "openshelf" {
  ami                    = data.aws_ami.ubuntu_24_04.id
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.public.id
  key_name               = aws_key_pair.openshelf.key_name
  vpc_security_group_ids = [aws_security_group.openshelf.id]

  # IMDSv2 – mandatory; disallow IMDSv1 token-less requests
  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required"
    http_put_response_hop_limit = 1
  }

  # Root EBS volume – encrypted
  root_block_device {
    volume_type           = "gp3"
    volume_size           = var.root_volume_size_gb
    encrypted             = true
    delete_on_termination = true

    tags = merge(local.common_tags, { Name = "${local.prefix}-root-ebs" })
  }

  # User data: install Docker + Docker Compose on first boot
  user_data = templatefile("${path.module}/user_data.sh.tpl", {
    project_name = var.project_name
  })

  tags = merge(local.common_tags, { Name = "${local.prefix}-server" })

  lifecycle {
    # Avoid replacing the instance when a new AMI is published mid-deployment
    ignore_changes = [ami]
  }
}
