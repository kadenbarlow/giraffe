#!/usr/bin/env node
import App from "#components/app/index.js"
import pipe from "#lib/pipe/index.js"
import { enterFullscreen, exitFullscreen, processArgv, renderApp, waitUntilExit } from "./actions/index.js"
import * as helpCommands from "./commands/help/index.js"
import request from "./commands/request/index.js"

try {
  const ctx = processArgv({
    appComponent: App,
    appInstance: null,
    args: {},
    command: null,
    helpTarget: null,
  })

  if (ctx.command === "help") {
    await (helpCommands[ctx.helpTarget] || helpCommands.main)(ctx)
  } else if (ctx.command === "request") {
    await request(ctx)
  } else {
    await pipe.async(enterFullscreen, renderApp, waitUntilExit, exitFullscreen)(ctx)
  }
} catch (error) {
  process.stderr.write(`${error.message}\n`)
  process.exitCode = 1
}
