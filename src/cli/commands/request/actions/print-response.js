export default function printResponse(ctx) {
  process.stdout.write(`${JSON.stringify(ctx.parsedResponse.json, null, 2)}\n`)
  return ctx
}
