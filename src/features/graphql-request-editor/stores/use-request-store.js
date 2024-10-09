import { create } from "zustand"

const useRequestStore = create((set) => ({
  filePath: "",
  headers: "{}",
  info: JSON.stringify({ description: "", filePath: "new-request.json", name: "" }, null, 2),
  jumpKey: null,
  jumpModeEnabled: false,
  query: "",
  response: "",
  setHeaders: (headers) => set({ headers }),
  setInfo: (info) => set({ info }),
  setJumpKey: (jumpKey) => set({ jumpKey }),
  setJumpModeEnabled: (jumpModeEnabled) => set({ jumpModeEnabled }),
  setQuery: (query) => set({ query }),
  setRequest: (request) => set({ ...request }),
  setResponse: (response) => set({ response }),
  setUrl: (url) => set({ url }),
  setVariables: (variables) => set({ variables }),
  url: "",
  variables: "{}",
}))
export default useRequestStore
