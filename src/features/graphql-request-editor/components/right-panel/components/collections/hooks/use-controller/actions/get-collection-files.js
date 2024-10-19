import { readdir } from "fs/promises"
import { join } from "path"

// https://stackoverflow.com/questions/20822273/best-way-to-get-folder-and-file-list-in-javascript
async function* ls(path = ".") {
  yield path
  for (const dirent of await readdir(path, { withFileTypes: true }))
    if (dirent.isDirectory()) yield* ls(join(path, dirent.name))
    else yield join(path, dirent.name)
}

async function* empty() {}

async function toArray(iter = empty()) {
  let r = []
  for await (const x of iter) r.push(x)
  return r
}

export default async function getCollectionFiles(ctx) {
  const { collectionsFolder } = ctx
  const filePaths = (await toArray(ls(collectionsFolder))).filter((filePath) => filePath.endsWith(".json"))

  return {
    ...ctx,
    filePaths,
  }
}
