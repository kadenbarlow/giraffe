#!/usr/bin/env node
import App from "#components/app/index.js"
import pipe from "#lib/pipe/index.js"
import { enterFullscreen, exitFullscreen, processArgv, renderApp, waitUntilExit } from "./actions/index.js"
import * as helpCommands from "./commands/help/index.js"
import introspect from "./commands/introspect/index.js"
import list from "./commands/list/index.js"
import request from "./commands/request/index.js"
import skills from "./commands/skills/index.js"

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
  } else if (ctx.command === "introspect") {
    await introspect(ctx)
  } else if (ctx.command === "list") {
    await list(ctx)
  } else if (ctx.command === "skills") {
    await skills(ctx)
  } else {
    await pipe.async(enterFullscreen, renderApp, waitUntilExit, exitFullscreen)(ctx)
  }
} catch (error) {
  process.stderr.write(`${error.message}\n`)
  process.exitCode = 1
}
