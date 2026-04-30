import { spawnSync } from "node:child_process"
import { chmodSync, copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs"
import { basename, join } from "node:path"

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, { shell: process.platform === "win32", stdio: "inherit", ...options })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

const distDir = join(process.cwd(), "dist")
const blobPath = join(distDir, "sea-prep.blob")
const nodePath = process.execPath
const extension = process.platform === "win32" ? ".exe" : ""
const outputName = `giraffe-${process.platform}-${process.arch}${extension}`
const outputPath = join(distDir, outputName)

if (!existsSync(blobPath)) {
  console.error(`Missing SEA blob: ${blobPath}`)
  console.error("Run: node --experimental-sea-config sea-config.json")
  process.exit(1)
}

mkdirSync(distDir, { recursive: true })
rmSync(outputPath, { force: true })
copyFileSync(nodePath, outputPath)

if (process.platform === "darwin") {
  run("codesign", ["--remove-signature", outputPath])
}

const postjectArgs = [
  outputPath,
  "NODE_SEA_BLOB",
  blobPath,
  "--sentinel-fuse",
  "NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2",
]

if (process.platform === "darwin") {
  postjectArgs.push("--macho-segment-name", "NODE_SEA")
}

run("npx", ["postject", ...postjectArgs])

if (process.platform === "darwin") {
  run("codesign", ["--sign", "-", outputPath])
}

if (process.platform !== "win32") {
  chmodSync(outputPath, 0o755)
}

console.log(`\nSEA binary created: ${outputPath}`)
console.log(`Base runtime: ${basename(nodePath)}`)
