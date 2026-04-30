import { spawnSync } from "child_process"
import fs from "fs/promises"
import os from "os"
import path from "path"

async function exists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

function commandExists(command) {
  const probe = process.platform === "win32" ? "where" : "which"
  const result = spawnSync(probe, [command], { stdio: "ignore" })
  return result.status === 0
}

export default async function detectAgentCandidates(ctx) {
  if (ctx.candidates) return ctx

  const home = os.homedir()

  return {
    ...ctx,
    candidates: [
      {
        agent: "claude",
        detected: commandExists("claude") || (await exists(path.join(home, ".claude"))),
        dir: path.join(home, ".claude", "skills", "giraffe"),
      },
      {
        agent: "pi",
        detected: commandExists("pi") || (await exists(path.join(home, ".pi"))),
        dir: path.join(home, ".pi", "agent", "skills", "giraffe"),
      },
    ],
  }
}
