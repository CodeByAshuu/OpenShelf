#!/bin/bash
# ==============================================================================
# Nagios Check Plugin: check_mem.sh
# Checks Linux memory utilization percentage with warning & critical thresholds.
#
# Usage:
#   check_mem.sh -w <warning_pct> -c <critical_pct>
#
# Exit codes:
#   0 - OK
#   1 - WARNING
#   2 - CRITICAL
#   3 - UNKNOWN
# ==============================================================================

WARN=80
CRIT=90

while getopts "w:c:h" opt; do
    case "$opt" in
        w) WARN="$OPTARG" ;;
        c) CRIT="$OPTARG" ;;
        h|*)
            echo "Usage: check_mem.sh -w <warning_pct> -c <critical_pct>"
            exit 3
            ;;
    esac
done

TOTAL_KB=$(grep MemTotal /proc/meminfo | awk '{print $2}')
AVAIL_KB=$(grep MemAvailable /proc/meminfo | awk '{print $2}')

if [ -z "$TOTAL_KB" ] || [ -z "$AVAIL_KB" ] || [ "$TOTAL_KB" -le 0 ]; then
    echo "UNKNOWN - Failed to read memory data from /proc/meminfo"
    exit 3
fi

USED_KB=$((TOTAL_KB - AVAIL_KB))
USED_PCT=$(( (USED_KB * 100) / TOTAL_KB ))
USED_MB=$((USED_KB / 1024))
TOTAL_MB=$((TOTAL_KB / 1024))

PERF_DATA="mem_used=${USED_PCT}%;${WARN};${CRIT};0;100"

if [ "$USED_PCT" -ge "$CRIT" ]; then
    echo "CRITICAL - Memory utilization is ${USED_PCT}% (${USED_MB}MB / ${TOTAL_MB}MB) | ${PERF_DATA}"
    exit 2
elif [ "$USED_PCT" -ge "$WARN" ]; then
    echo "WARNING - Memory utilization is ${USED_PCT}% (${USED_MB}MB / ${TOTAL_MB}MB) | ${PERF_DATA}"
    exit 1
else
    echo "OK - Memory utilization is ${USED_PCT}% (${USED_MB}MB / ${TOTAL_MB}MB) | ${PERF_DATA}"
    exit 0
fi
