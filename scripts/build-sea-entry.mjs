import { build } from "esbuild"
import { createSeaBuildConfig } from "./esbuild-config.mjs"

await build(createSeaBuildConfig())
