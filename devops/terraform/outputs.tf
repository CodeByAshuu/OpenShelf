output "instance_id" {
  description = "EC2 instance ID."
  value       = aws_instance.openshelf.id
}

output "instance_public_ip" {
  description = "Public IP address of the EC2 instance."
  value       = aws_instance.openshelf.public_ip
}

output "instance_public_dns" {
  description = "Public DNS of the EC2 instance."
  value       = aws_instance.openshelf.public_dns
}

output "ssh_command" {
  description = "SSH command to connect to the instance."
  value       = "ssh -i ~/.ssh/openshelf-aws ubuntu@${aws_instance.openshelf.public_ip}"
}

output "ami_id" {
  description = "AMI resolved for Ubuntu 24.04 in this region."
  value       = data.aws_ami.ubuntu_24_04.id
}

output "vpc_id" {
  description = "VPC ID."
  value       = aws_vpc.main.id
}

output "security_group_id" {
  description = "Security group ID."
  value       = aws_security_group.openshelf.id
}
