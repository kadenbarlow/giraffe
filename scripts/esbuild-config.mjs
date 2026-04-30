import pkg from "../package.json" with { type: "json" }

const baseAlias = {
  "#components": "./src/components",
  "#features": "./src/features",
  "#hooks": "./src/hooks",
  "#lib": "./src/lib",
  "#stores": "./src/stores",
}

export function createCliBuildConfig(overrides = {}) {
  return {
    absWorkingDir: process.cwd(),
    alias: {
      ...baseAlias,
      ...(overrides.alias ?? {}),
    },
    bundle: true,
    entryPoints: ["./src/cli/index.js"],
    format: "esm",
    loader: {
      ".js": "jsx",
    },
    platform: "node",
    sourcemap: false,
    target: "node22",
    ...overrides,
  }
}

export function createAppBuildConfig() {
  return createCliBuildConfig({
    external: Object.keys(pkg.dependencies ?? {}),
    outfile: "./dist/cli/index.js",
  })
}

export function createSeaBuildConfig() {
  return createCliBuildConfig({
    alias: {
      "react-devtools-core": "./scripts/stubs/react-devtools-core.js",
    },
    banner: {
      js: 'import { createRequire as __createRequire } from "node:module"; const require = __createRequire(import.meta.url);',
    },
    define: {
      "process.env.DEV": '"false"',
    },
    external: ["fsevents"],
    outfile: "./dist/sea-entry.mjs",
  })
}
