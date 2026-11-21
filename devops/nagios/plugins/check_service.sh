#!/bin/bash
# ==============================================================================
# Nagios Check Plugin: check_service.sh
# Checks if a systemd service is active and running.
#
# Usage:
#   check_service.sh <service_name>
#
# Exit codes:
#   0 - OK
#   2 - CRITICAL
#   3 - UNKNOWN
# ==============================================================================

SERVICE="$1"

if [ -z "$SERVICE" ]; then
    echo "UNKNOWN - Service name is required. Usage: check_service.sh <service_name>"
    exit 3
fi

if systemctl is-active --quiet "$SERVICE"; then
    echo "OK - Service '$SERVICE' is active and running"
    exit 0
else
    STATE=$(systemctl is-active "$SERVICE" 2>/dev/null || echo "inactive")
    echo "CRITICAL - Service '$SERVICE' is not active (status: $STATE)"
    exit 2
fi
