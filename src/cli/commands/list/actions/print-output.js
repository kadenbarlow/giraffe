export default async function printOutput(ctx) {
  process.stdout.write(ctx.output)
  return ctx
}
