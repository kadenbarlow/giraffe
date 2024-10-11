import { render } from "ink"
import React from "react"

export default async function renderApp(ctx) {
  const { appComponent: App, args } = ctx
  const appInstance = render(<App args={args} />, { exitOnCtrlC: false })
  return { ...ctx, appInstance }
}
