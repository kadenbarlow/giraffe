function normalizeRelativePath(collectionsFolder, filePath) {
  return filePath.replace(collectionsFolder, "").replace(/^\//, "")
}

export default async function buildOutput(ctx) {
  const { collectionsFolder, parsedFilesByPath } = ctx

  const lines = Object.entries(parsedFilesByPath)
    .filter(([, parsedFile]) => parsedFile)
    .sort(([leftPath], [rightPath]) => leftPath.localeCompare(rightPath))
    .map(([filePath, parsedFile]) =>
      `${normalizeRelativePath(collectionsFolder, filePath)} - ${parsedFile.name || ""}`.trimEnd(),
    )

  return {
    ...ctx,
    output: `${lines.join("\n")}${lines.length ? "\n" : ""}`,
  }
}
