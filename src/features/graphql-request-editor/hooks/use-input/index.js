import { useApp, useFocusManager, useInput } from "ink"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useFormatting from "./hooks/use-formatting/index.js"
import useSendRequest from "./hooks/use-send-request/index.js"

export default () => {
  const app = useApp()
  const { focus } = useFocusManager()
  const { formatEditorContent } = useFormatting()
  const { sendRequest } = useSendRequest()
  const jumpModeEnabled = useRequestStore((state) => state.jumpModeEnabled)
  const setJumpModeEnabled = useRequestStore((state) => state.setJumpModeEnabled)
  const setJumpKey = useRequestStore((state) => state.setJumpKey)

  const jumpTo = (input) => {
    setJumpKey(input)
    if (input === "e") {
      focus("left-panel")
    } else if (input === "u") {
      focus("header")
    } else if (["v", "h"].includes(input)) {
      focus("bottom-panel")
    } else if (["r", "s", "c"].includes(input)) {
      focus("right-panel")
    }
    setJumpModeEnabled(false)
  }

  useInput((input, key) => {
    if (jumpModeEnabled) {
      jumpTo(input)
    } else if (key.ctrl && input === "q") {
      app.exit()
    } else if (key.ctrl && input === "o") {
      setJumpModeEnabled(true)
    } else if (key.ctrl && input === "p") {
      formatEditorContent()
    } else if (key.ctrl && input === "r") {
      setJumpKey("r")
      focus("right-panel")
      sendRequest()
    }
  })
}
