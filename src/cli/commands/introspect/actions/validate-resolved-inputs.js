export default function validateResolvedInputs(ctx) {
  const { url } = ctx
  if (!url) throw new Error("A GraphQL endpoint URL is required")
  return ctx
}
