import SwiftUI
import WebKit

@main
struct LifeCalculatorApp: App {
    var body: some Scene {
        WindowGroup {
            WebView()
                .frame(minWidth: 800, minHeight: 600)
        }
    }
}

struct WebView: NSViewRepresentable {
    func makeNSView(context: Context) -> WKWebView {
        let view = WKWebView()
        if let indexURL = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "dist") {
            view.loadFileURL(indexURL, allowingReadAccessTo: indexURL.deletingLastPathComponent())
        }
        return view
    }

    func updateNSView(_ nsView: WKWebView, context: Context) {}
}
