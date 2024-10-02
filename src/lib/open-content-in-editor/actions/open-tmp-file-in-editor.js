import { spawn } from "child_process"
import writeToStdout from "#lib/write-to-stdout.js"

export default function openTmpFileInEditor(ctx) {
  const { tmpFilePath } = ctx
  return new Promise((resolve, reject) => {
    const child = spawn("nvim", [tmpFilePath], { stdio: "inherit" })
    child.on("close", () => {
      resolve(ctx)
      writeToStdout("\u001B[?25l")
    })
  })
}
