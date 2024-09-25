#!/usr/bin/env node
import App from "#components/app.js"
import pipe from "#lib/pipe/index.js"
import { enterFullscreen, exitFullscreen, processArgv, renderApp, waitUntilExit } from "./actions/index.js"

pipe.async(
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
