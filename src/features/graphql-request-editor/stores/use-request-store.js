import { create } from "zustand"

const useRequestStore = create((set) => ({
  headers: "",
  query: "",
  response: "",
  setHeaders: (headers) => set({ headers }),
  setQuery: (query) => set({ query }),
  setResponse: (response) => set({ response }),
  setUrl: (url) => set({ url }),
  setVariables: (variables) => set({ variables }),
  url: "",
  variables: "",
}))
export default useRequestStore
