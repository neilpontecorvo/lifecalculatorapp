# MacOS Wrapper

This Swift package provides a minimal macOS application for the Life Calculator project.

1. Build the web client in `../LifeCalculatorV2` using `npm run build`.
2. Copy the generated files from `LifeCalculatorV2/client/dist` into this package's `dist` directory.
3. Open `Package.swift` in Xcode and run the app.

The app loads the bundled files using `WKWebView`.
