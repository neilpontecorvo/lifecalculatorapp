# Harmonic Mix

Harmonic Mix is a Phase 1 Android app that opens directly to an interactive Camelot harmonic-mixing wheel.

![Screenshot placeholder](docs/screenshot-placeholder.png)

## Phase 1 features
- 24-sector programmatic Camelot wheel with outer major B and inner minor A rings.
- Immediate touch and accessibility click selection.
- Selected, compatible, and energy-boost states.
- Canonical catalog for labels, hit testing, compatibility, semantics, and tests.
- State restoration through ViewModel and SavedStateHandle.
- No permissions, network, analytics, ads, media scanning, or audio analysis.

## Architecture
Single Android application module using Kotlin, Jetpack Compose, Material 3, StateFlow, and unidirectional data flow. Domain logic lives under `domain`; wheel rendering, hit testing, UI state, and ViewModel code live under `ui/wheel`.

## Requirements
JDK 21, Android SDK platform 36/build-tools 36.0.0, Gradle, and network access to Google Maven/Maven Central. In Codex containers, run `scripts/setup-codex-android.sh` if the SDK is missing.

## Build and test
```bash
./gradlew --version
./gradlew testDebugUnitTest
./gradlew lintDebug
./gradlew assembleDebug
./gradlew assembleDebugAndroidTest
```

Debug APK: `app/build/outputs/apk/debug/app-debug.apk`.

## Install
```bash
scripts/install-debug.sh [optional-adb-serial]
scripts/verify-device.sh [optional-adb-serial]
```

## Current limitations
Phase 1 intentionally excludes audio analysis, BPM/key detection, playlists, networking, accounts, settings, notifications, and release signing. Physical Samsung Galaxy S26+ verification is pending local execution when a device is attached.

## Extension points
Future phases can add audio analysis, media-library integration, route planning, import/export, and release signing while retaining the canonical Camelot catalog and relation engine.
