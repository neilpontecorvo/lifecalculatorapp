#!/usr/bin/env bash
set -euo pipefail
SERIAL="${1:-}"; ADB=(adb); [[ -n "$SERIAL" ]] && ADB=(adb -s "$SERIAL")
OUT="${TMPDIR:-/tmp}/harmonic-mix-device/verify-$(date +%Y%m%d-%H%M%S).log"; mkdir -p "$(dirname "$OUT")"
{ adb devices -l; "${ADB[@]}" shell getprop ro.product.model; "${ADB[@]}" shell getprop ro.build.version.release; "${ADB[@]}" shell getprop ro.build.version.sdk; "${ADB[@]}" shell wm size; "${ADB[@]}" shell wm density; "${ADB[@]}" shell pm path com.neilpontecorvo.harmonicmix; "${ADB[@]}" shell am start -n com.neilpontecorvo.harmonicmix/.MainActivity; sleep 2; "${ADB[@]}" logcat -d -t 200 | grep -i "FATAL EXCEPTION" || true; } | tee "$OUT"
echo "Verification log: $OUT"
