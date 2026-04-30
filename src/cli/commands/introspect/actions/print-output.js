export default function printOutput(ctx) {
  process.stdout.write(`\n${ctx.output}`)
  return ctx
}
