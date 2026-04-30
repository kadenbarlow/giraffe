import { spawnSync } from "node:child_process"

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, { stdio: "inherit", shell: process.platform === "win32", ...options })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

run("npm", ["run", "release:npm"])
run("npm", ["run", "release:homebrew"])
