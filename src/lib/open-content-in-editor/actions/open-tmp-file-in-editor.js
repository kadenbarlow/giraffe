import { spawn } from "child_process"
import writeToStdout from "#lib/write-to-stdout.js"

export default function openTmpFileInEditor(ctx) {
  const { tmpFilePath } = ctx
  return new Promise((resolve) => {
    // First exit fullscreen mode so that you can focus and unfocus without weird ui issues
    writeToStdout("\x1b[?1049l").then(() => {
      const child = spawn(process.env.EDITOR, [tmpFilePath], { stdio: "inherit" })
      child.on("close", async () => {
        await writeToStdout("\x1b[?1049h") // after closing enter fullscreen and redraw the app
        await writeToStdout("\u001B[?25l")
        return resolve(ctx)
      })
    })
  })
}
