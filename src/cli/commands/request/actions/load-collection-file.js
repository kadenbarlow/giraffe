import fs from "fs/promises"
import path from "path"
import useConfig from "#stores/use-config/index.js"

export default async function loadCollectionFile(ctx) {
  const { args } = ctx
  if (!args.request) return ctx

  const folderPath = args.collections || useConfig.getState().collections.folderPath
  const collectionPath = path.isAbsolute(args.request) ? args.request : path.join(folderPath, args.request)
  const fileContent = await fs.readFile(collectionPath, "utf8")

  return {
    ...ctx,
    collectionFile: JSON.parse(fileContent),
    collectionPath,
  }
}
