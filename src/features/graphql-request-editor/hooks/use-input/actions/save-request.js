import fs from "fs/promises"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import safelyParseJson from "#lib/safely-parse-json.js"
import useConfig from "#stores/use-config/index.js"

function createPath(folder, file) {
  return `${folder}${file.startsWith("/") ? "" : "/"}${file}`
}

export default async function saveRequest() {
  const { filePath, headers, info, query, setRequest, url, variables } = useRequestStore.getState()
  const folderPath = useConfig.getState().collections.folderPath
  const previousPath = createPath(folderPath, filePath)

  const parsedInfo = safelyParseJson(info)
  if (!parsedInfo) return
  if (!parsedInfo.filePath.endsWith(".json")) parsedInfo.filePath = `${parsedInfo.filePath}.json`

  const fileData = JSON.stringify(
    {
      description: parsedInfo.description,
      headers: safelyParseJson(headers),
      name: parsedInfo.name,
      query,
      url,
      variables: safelyParseJson(variables),
    },
    null,
    2,
  )

  const currentPath = createPath(folderPath, parsedInfo.filePath)
  await fs.mkdir(currentPath.split("/").slice(0, -1).join("/"), { recursive: true })
  await fs.writeFile(currentPath, fileData)
  if (filePath && currentPath !== previousPath) {
    await fs.unlink(previousPath)
  }

  setRequest({ filePath: parsedInfo.filePath, info: JSON.stringify(parsedInfo, null, 2), savedAt: new Date() })
}
