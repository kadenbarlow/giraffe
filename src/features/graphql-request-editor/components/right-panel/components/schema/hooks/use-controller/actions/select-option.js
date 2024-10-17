import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"

export default function selectOption(option) {
  const setRequest = useRequestStore.getState().setRequest
  setRequest({
    query: option.loc.source.body.slice(option.loc.start, option.loc.end),
  })
}
