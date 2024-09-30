import { create } from "zustand"

const useRequestStore = create((set) => ({
  headers: "{}",
  jumpKey: null,
  jumpModeEnabled: false,
  query: "",
  response: "",
  setHeaders: (headers) => set({ headers }),
  setJumpKey: (jumpKey) => set({ jumpKey }),
  setJumpModeEnabled: (jumpModeEnabled) => set({ jumpModeEnabled }),
  setQuery: (query) => set({ query }),
  setResponse: (response) => set({ response }),
  setUrl: (url) => set({ url }),
  setVariables: (variables) => set({ variables }),
  url: "",
  variables: "{}",
}))
export default useRequestStore
