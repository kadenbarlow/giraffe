import { spawnSync } from "child_process"
import writeToStdout from "#lib/write-to-stdout.js"

export default async function openTmpFileInEditor(ctx) {
  const { tmpFilePath } = ctx
  await writeToStdout("\x1bc")
  spawnSync(process.env.EDITOR || "vim", [tmpFilePath], { stdio: "inherit" })
  writeToStdout("\u001B[?25l") // makes the cursor invisible again
  return ctx
}
