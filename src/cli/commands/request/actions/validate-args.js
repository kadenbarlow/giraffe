export default function validateArgs(ctx) {
  const { args } = ctx

  if (!args.request && !args.url) throw new Error("One of --request or --url is required")
  if (args.name && !args.type) throw new Error("--type is required when --name is provided")
  if (args.type && !args.name) throw new Error("--name is required when --type is provided")
  if (args.type && !["query", "mutation"].includes(args.type)) {
    throw new Error("--type must be one of: query, mutation")
  }
  if (!args.request && !args.name && !args.query) {
    throw new Error("--query or --name is required when using --url without --request")
  }
  if (args.variables) JSON.parse(args.variables)
  if (args.headers) JSON.parse(args.headers)

  return ctx
}
