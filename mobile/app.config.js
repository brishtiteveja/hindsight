const { execSync } = require("child_process");

/**
 * Android versionCode must increase with every upload. Deriving it from the
 * commit count means a normal `git commit` cadence produces monotonic numbers
 * without anyone remembering to bump a file. Override for out-of-band uploads.
 */
function androidVersionCode() {
  if (process.env.ANDROID_VERSION_CODE) {
    return parseInt(process.env.ANDROID_VERSION_CODE, 10);
  }
  try {
    const count = execSync("git rev-list --count HEAD", {
      stdio: ["pipe", "pipe", "ignore"],
    })
      .toString()
      .trim();
    return parseInt(count, 10) || 1;
  } catch {
    return 1;
  }
}

const BUNDLE_ID = "co.perspectivity.hindsight";
const APP_VERSION = process.env.APP_VERSION || "1.0.0";

module.exports = () => ({
  expo: {
    name: "Hindsight",
    slug: process.env.EXPO_PUBLIC_EAS_SLUG || "hindsight",
    version: APP_VERSION,
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "hindsight",
    userInterfaceStyle: "dark",
    newArchEnabled: true,
    backgroundColor: "#0c0b09",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#0c0b09",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: BUNDLE_ID,
      buildNumber: process.env.IOS_BUILD_NUMBER || "1",
      config: { usesNonExemptEncryption: false },
      infoPlist: {
        // The app reads public YouTube captions over HTTPS only.
        NSAppTransportSecurity: { NSAllowsArbitraryLoads: false },
      },
    },
    android: {
      package: BUNDLE_ID,
      versionCode: androidVersionCode(),
      edgeToEdgeEnabled: true,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#0c0b09",
      },
    },
    web: { bundler: "metro", output: "static", favicon: "./assets/icon.png" },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/splash.png",
          resizeMode: "contain",
          backgroundColor: "#0c0b09",
        },
      ],
      [
        "expo-build-properties",
        {
          android: { compileSdkVersion: 35, targetSdkVersion: 35 },
          ios: { deploymentTarget: "15.1" },
        },
      ],
    ],
    experiments: { typedRoutes: true },
    extra: {
      apiBase:
        process.env.EXPO_PUBLIC_API_BASE ||
        "https://dev.perspectivity.co/hindsight",
      eas: {
        projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID || undefined,
      },
    },
  },
});
