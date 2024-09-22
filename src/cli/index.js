#!/usr/bin/env node
import App from "#components/app.js"
import pipe from "#lib/pipe.js"
import { enterFullscreen, exitFullscreen, processArgv, renderApp, waitUntilExit } from "./actions/index.js"

pipe(
  processArgv,
  enterFullscreen,
  renderApp,
  waitUntilExit,
  exitFullscreen,
)({
  appComponent: App,
  appInstance: null,
  args: {},
})
