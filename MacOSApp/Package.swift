// swift-tools-version: 6.1
import PackageDescription

let package = Package(
    name: "MacOSApp",
    platforms: [
        .macOS(.v13)
    ],
    targets: [
        .executableTarget(
            name: "MacOSApp",
            resources: [
                .copy("dist")
            ]
        )
    ]
)
