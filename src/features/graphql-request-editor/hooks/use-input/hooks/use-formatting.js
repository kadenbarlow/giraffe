import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import safelyFormatGraphql from "#lib/safely-format-graphql.js"
import safelyParseJson from "#lib/safely-parse-json.js"

export default function useController() {
  const setHeaders = useRequestStore((state) => state.setHeaders)
  const setVariables = useRequestStore((state) => state.setVariables)
  const setQuery = useRequestStore((state) => state.setQuery)

  const formatEditorContent = async () => {
    const { headers, query, variables } = useRequestStore.getState()
    const formattedHeaders = safelyParseJson(headers)
    const formattedVariables = safelyParseJson(variables)
    const formattedQuery = await safelyFormatGraphql(query)
    if (formattedHeaders) setHeaders(JSON.stringify(JSON.parse(headers), null, 2))
    if (formattedVariables) setVariables(JSON.stringify(JSON.parse(variables), null, 2))
    if (formattedQuery) setQuery(formattedQuery)
  }

  return { formatEditorContent }
}
