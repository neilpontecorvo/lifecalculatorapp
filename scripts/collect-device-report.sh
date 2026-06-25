#!/usr/bin/env bash
set -euo pipefail
SERIAL="${1:-}"; ADB=(adb); [[ -n "$SERIAL" ]] && ADB=(adb -s "$SERIAL")
OUT="${TMPDIR:-/tmp}/harmonic-mix-device/report-$(date +%Y%m%d-%H%M%S).txt"; mkdir -p "$(dirname "$OUT")"
{ adb devices -l; "${ADB[@]}" shell getprop ro.product.model; "${ADB[@]}" shell getprop ro.build.version.sdk; "${ADB[@]}" shell dumpsys package com.neilpontecorvo.harmonicmix | head -120; "${ADB[@]}" logcat -d -t 300 | grep com.neilpontecorvo.harmonicmix || true; } > "$OUT"
echo "$OUT"
