import fs from "fs/promises"
import safelyParseJson from "#lib/safely-parse-json.js"

export default async function loadCollectionFiles(ctx) {
  const { filePaths } = ctx

  return Promise.all(
    filePaths.map((filePath) => fs.readFile(filePath, "utf8").then((fileContent) => [filePath, fileContent])),
  ).then((data) => ({
    ...ctx,
    parsedFilesByPath: data.reduce((acc, [path, fileContent]) => {
      acc[path] = safelyParseJson(fileContent)
      return acc
    }, {}),
  }))
}
