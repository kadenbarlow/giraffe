import { useApp, useInput } from "ink"

export default ({ actions }) => {
  const app = useApp()

  useInput((input, key) => {
    debugger
    if (key.ctrl && input === "q") {
      app.exit()
    } else if (key.ctrl && input === "p") {
      actions.formatJsonValues()
    } else if (key.ctrl && input === "s") {
      actions.sendRequest()
    }
  })
}
