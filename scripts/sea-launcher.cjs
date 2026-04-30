const { mkdtempSync, rmSync, writeFileSync } = require("node:fs")
const { tmpdir } = require("node:os")
const { join } = require("node:path")
const { pathToFileURL } = require("node:url")
const { getAsset } = require("node:sea")

;(async () => {
  const dir = mkdtempSync(join(tmpdir(), "giraffe-sea-"))
  const filePath = join(dir, "sea-entry.mjs")

  try {
    writeFileSync(filePath, getAsset("sea-app.mjs", "utf8"))
    await import(pathToFileURL(filePath).href)
  } finally {
    rmSync(dir, { force: true, recursive: true })
  }
})().catch((error) => {
  process.stderr.write(`${error?.stack || error?.message || String(error)}\n`)
  process.exitCode = 1
})
