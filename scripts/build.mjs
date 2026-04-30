import { build } from "esbuild"
import { chmodSync, rmSync } from "node:fs"
import { createAppBuildConfig } from "./esbuild-config.mjs"

rmSync("./dist", { force: true, recursive: true })
await build(createAppBuildConfig())

if (process.platform !== "win32") {
  chmodSync("./dist/cli/index.js", 0o755)
}
