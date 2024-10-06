export default function serializeParsedFiles(ctx) {
  const { collectionsFolder, parsedFilesByPath } = ctx

  const collections = Object.entries(parsedFilesByPath).reduce((collections, [path, parsedFile]) => {
    const relativePath = path.replace(collectionsFolder, "")
    const pathParts = relativePath.split("/")
    const folderNames = pathParts.slice(0, -1).filter(Boolean)

    const collection =
      folderNames.reduce((acc, folderName) => {
        acc[folderName] ??= {}
        return acc[folderName]
      }, collections) || collections
    collection[pathParts[pathParts.length - 1].replace(".json", "")] = parsedFile

    return collections
  }, {})

  return {
    ...ctx,
    collections,
  }
}
