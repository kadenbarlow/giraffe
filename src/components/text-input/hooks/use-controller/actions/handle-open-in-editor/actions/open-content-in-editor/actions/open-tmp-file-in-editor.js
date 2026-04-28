import { spawnSync } from "child_process"
import writeToStdout from "#lib/write-to-stdout.js"

export default async function openTmpFileInEditor(ctx) {
  const { tmpFilePath } = ctx

  if (process.stdin.isTTY) {
    process.stdin.setRawMode(false)
  }

  await writeToStdout("\u001B[?25h")
  spawnSync(process.env.EDITOR || "vim", [tmpFilePath], { stdio: "inherit" })
  await writeToStdout("\u001B[2J\u001B[H")
  await writeToStdout("\u001B[?25l")

  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true)
  }

  return ctx
}
