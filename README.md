# Life Calculator

This repository contains the source code for the **Life Calculator** application. The project is split into two main parts:

- **LifeCalculatorV2/** – the web client and server written with React, Express and TypeScript.
- **MacOSApp/** – a Swift package containing a minimal macOS wrapper application. This wrapper loads the built web client using `WKWebView` so the project can be distributed as a native macOS app.

## Running the Web Version

1. Install dependencies:
   ```bash
   cd LifeCalculatorV2
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The server runs on port `5000`.
3. Build for production:
   ```bash
   npm run build
   ```
   The client will be compiled to `client/dist`.

## Building the macOS App

The `MacOSApp` directory is a Swift package that can be opened directly in Xcode. It contains a simple SwiftUI application that loads the `client/dist` files using `WKWebView`.

Steps:

1. Ensure the web client is built (`npm run build` as above).
2. Open `MacOSApp/Package.swift` in Xcode.
3. Add the contents of `LifeCalculatorV2/client/dist` to the `Resources` folder of the Xcode project (or adjust the paths in `ContentView.swift`).
4. Build and run the app from Xcode.

This setup allows the web application to be bundled and distributed as a native macOS application.
