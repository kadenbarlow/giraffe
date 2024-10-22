import chalk from "chalk"
import { create } from "zustand"
import useConfig from "#stores/use-config/index.js"

const useRequestStore = create((set) => ({
  filePath: "",
  headers: "{}",
  info: JSON.stringify({ description: "", filePath: "new-request.json", name: "" }, null, 2),
  jumpKey: null,
  jumpModeEnabled: false,
  query: "",
  response: "",
  savedAt: new Date(),
  setHeaders: (headers) => set({ headers }),
  setInfo: (info) => set({ info }),
  setJumpKey: (jumpKey) => set({ jumpKey }),
  setJumpModeEnabled: (jumpModeEnabled) => set({ jumpModeEnabled }),
  setQuery: (query) => set({ query }),
  setRequest: (request) => set({ ...request }),
  setResponse: (response) => set({ response }),
  setToast: ({ message, timeout, type }) => {
    const { theme } = useConfig.getState()
    set({ toast: chalk.hex(theme[type])(message) })

    if (timeout) {
      setTimeout(() => {
        set({ toast: "" })
      }, timeout)
    }
  },
  setUrl: (url) => set({ url }),
  setVariables: (variables) => set({ variables }),
  toast: "",
  url: "",
  variables: "{}",
}))
export default useRequestStore
