#!/bin/bash
# ==============================================================================
# Nagios Check Plugin: check_docker.sh
# Verifies Docker container state and Docker internal health status.
#
# Usage:
#   check_docker.sh <container_name>
#
# Exit codes:
#   0 - OK
#   1 - WARNING
#   2 - CRITICAL
#   3 - UNKNOWN
# ==============================================================================

CONTAINER="$1"

if [ -z "$CONTAINER" ]; then
    echo "UNKNOWN - Container name is required. Usage: check_docker.sh <container_name>"
    exit 3
fi

# Ensure Docker CLI / daemon is responding
if ! docker info >/dev/null 2>&1; then
    echo "CRITICAL - Unable to communicate with Docker daemon"
    exit 2
fi

# Retrieve container execution status
STATE=$(docker inspect --format '{{.State.Status}}' "$CONTAINER" 2>/dev/null)
if [ $? -ne 0 ] || [ -z "$STATE" ]; then
    echo "CRITICAL - Container '$CONTAINER' not found or stopped"
    exit 2
fi

# Retrieve container healthcheck status (if defined)
HEALTH=$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' "$CONTAINER" 2>/dev/null)

if [ "$STATE" = "running" ]; then
    if [ "$HEALTH" = "healthy" ]; then
        echo "OK - Container '$CONTAINER' is running and healthy"
        exit 0
    elif [ "$HEALTH" = "none" ]; then
        echo "OK - Container '$CONTAINER' is running (healthcheck not configured)"
        exit 0
    elif [ "$HEALTH" = "starting" ]; then
        echo "WARNING - Container '$CONTAINER' is running (healthcheck starting)"
        exit 1
    else
        echo "CRITICAL - Container '$CONTAINER' is running but health status is '$HEALTH'"
        exit 2
    fi
else
    echo "CRITICAL - Container '$CONTAINER' state is '$STATE'"
    exit 2
fi
