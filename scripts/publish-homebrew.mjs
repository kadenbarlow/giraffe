import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import pkg from "../package.json" with { type: "json" }
import { tmpdir } from "node:os"
import { basename, join } from "node:path"
import { spawnSync } from "node:child_process"

const run = (command, args) => {
  const result = spawnSync(command, args, { stdio: "inherit", shell: process.platform === "win32" })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

const match = pkg.repository.url.match(/github\.com[:/](.+?)\/(.+?)(?:\.git)?$/)
const owner = process.env.HOMEBREW_REPO_OWNER || match?.[1]
const repo = process.env.HOMEBREW_REPO_NAME || match?.[2]
const tag = process.env.HOMEBREW_TAG || `v${pkg.version}`
const tapRepoPath = process.env.HOMEBREW_TAP_REPO_PATH

if (!tapRepoPath) {
  console.error("Missing HOMEBREW_TAP_REPO_PATH")
  process.exit(1)
}

if (!owner || !repo) {
  console.error("Could not infer GitHub owner/repo. Set HOMEBREW_REPO_OWNER and HOMEBREW_REPO_NAME.")
  process.exit(1)
}

const editor = process.env.VISUAL || process.env.EDITOR || "vi"
const extension = process.platform === "win32" ? ".exe" : ""
const arch = process.arch
const binaryName = `giraffe-${process.platform}-${arch}${extension}`
const binaryPath = join("dist", binaryName)
const tarballPath = join("dist", `${binaryName}.tar.gz`)

const tempDir = mkdtempSync(join(tmpdir(), "giraffe-release-"))
const draftPath = join(tempDir, "release-notes.md")

writeFileSync(
  draftPath,
  `${tag}\n\n# Release notes\n\n- `,
)

run(editor, [draftPath])

const draft = readFileSync(draftPath, "utf8").trim()
rmSync(tempDir, { force: true, recursive: true })

const [titleLine, ...noteLines] = draft.split("\n")
const title = titleLine.trim()
const notes = noteLines.join("\n").trim()

if (!title) {
  console.error("Release title is required")
  process.exit(1)
}

run("gh", ["release", "create", tag, "--title", title, "--notes", notes])

if (!existsSync(binaryPath)) {
  console.error(`Missing SEA binary: ${binaryPath}`)
  console.error("Run npm run build:sea first.")
  process.exit(1)
}

run("tar", ["-C", "dist", "-czf", tarballPath, basename(binaryPath)])
console.log(`Packaged ${tarballPath}`)

run("gh", ["release", "upload", tag, tarballPath, "--clobber"])

run("node", [
  "./scripts/update-homebrew-tap.mjs",
  tapRepoPath,
  owner,
  repo,
  tag,
  tarballPath,
  arch,
])
