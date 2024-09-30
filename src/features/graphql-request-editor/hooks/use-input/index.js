import { useApp, useInput } from "ink"
import useFormatting from "./hooks/use-formatting/index.js"
import useSendRequest from "./hooks/use-send-request/index.js"

export default () => {
  const app = useApp()
  const { formatEditorContent } = useFormatting()
  const { sendRequest } = useSendRequest()

  useInput((input, key) => {
    if (key.ctrl && input === "q") {
      app.exit()
    } else if (key.ctrl && input === "p") {
      formatEditorContent()
    } else if (key.ctrl && input === "s") {
      sendRequest()
    }
  })
}
