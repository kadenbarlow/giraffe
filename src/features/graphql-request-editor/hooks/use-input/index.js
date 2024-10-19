import { useApp, useFocusManager, useInput } from "ink"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import { deleteRequest, formatRequest, newRequest, saveRequest, sendRequest } from "./actions/index.js"

export default () => {
  const app = useApp()
  const { focus } = useFocusManager()
  const jumpModeEnabled = useRequestStore((state) => state.jumpModeEnabled)
  const setJumpModeEnabled = useRequestStore((state) => state.setJumpModeEnabled)
  const setJumpKey = useRequestStore((state) => state.setJumpKey)

  const jumpTo = (input) => {
    setJumpKey(input)
    if (input === "e") {
      focus("left-panel")
    } else if (input === "u") {
      focus("header")
    } else if (["v", "i", "h"].includes(input)) {
      focus("bottom-panel")
    } else if (["r", "s", "c", "p"].includes(input)) {
      focus("right-panel")
    }
    setJumpModeEnabled(false)
  }

  useInput((input, key) => {
    const meta = key.ctrl || key.meta
    if (jumpModeEnabled) {
      jumpTo(input)
    } else if (meta && ["c", "d", "q"].includes(input)) {
      app.exit()
    } else if ((input === "\n" && !key.return) || (meta && input === "j")) {
      // ^j is converted to enter key by terminals
      setJumpModeEnabled(true)
    } else if (meta && input === "n") {
      newRequest()
    } else if (meta && input === "p") {
      formatRequest()
    } else if (meta && input === "r") {
      setJumpKey("r")
      focus("right-panel")
      sendRequest()
    } else if (meta && input === "s") {
      saveRequest()
    } else if (meta && input === "x") {
      deleteRequest()
    }
  })
}
