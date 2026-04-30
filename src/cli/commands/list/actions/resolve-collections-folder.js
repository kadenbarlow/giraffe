import useConfig from "#stores/use-config/index.js"

export default async function resolveCollectionsFolder(ctx) {
  return {
    ...ctx,
    collectionsFolder: ctx.args.collections || useConfig.getState().collections.folderPath,
  }
}
