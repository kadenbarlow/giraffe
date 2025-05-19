export default function removeTabs(ctx) {
  const { input } = ctx

  return {
    ...ctx,
    input: input.replace(/\t/g, "  "),
  }
}
