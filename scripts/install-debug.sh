#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"; cd "$ROOT"
SERIAL="${1:-}"; APK="app/build/outputs/apk/debug/app-debug.apk"
[[ -f "$APK" ]] || ./gradlew assembleDebug
ADB=(adb); [[ -n "$SERIAL" ]] && ADB=(adb -s "$SERIAL")
adb devices -l
if [[ -z "$SERIAL" ]]; then mapfile -t devs < <(adb devices | awk 'NR>1 && $2=="device" {print $1}'); [[ ${#devs[@]} -eq 1 ]] || { echo "Need exactly one authorized device or pass serial" >&2; exit 2; }; SERIAL="${devs[0]}"; ADB=(adb -s "$SERIAL"); fi
"${ADB[@]}" install -r "$APK"
"${ADB[@]}" shell am start -n com.neilpontecorvo.harmonicmix/.MainActivity
echo "Installed and launched Harmonic Mix on $SERIAL"
