export default function resolveRequestInputs(ctx) {
  const { args, collectionFile } = ctx

  return {
    ...ctx,
    headers: args.headers || JSON.stringify(collectionFile?.headers || {}),
    query: args.query || collectionFile?.query || "",
    url: args.url || collectionFile?.url || "",
    variables: args.variables || JSON.stringify(collectionFile?.variables || {}),
  }
}
