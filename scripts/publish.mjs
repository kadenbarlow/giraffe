import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { spawnSync } from "node:child_process"
import pkg from "../package.json" with { type: "json" }

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, { stdio: "inherit", shell: process.platform === "win32", ...options })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

const editor = process.env.VISUAL || process.env.EDITOR || "vi"
const tag = `v${pkg.version}`
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
run("npm", ["run", "publish:npm"])
run("npm", ["run", "publish:homebrew"])
