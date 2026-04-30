export default function printSummary(ctx) {
  const { args, installed, skipped } = ctx

  if (!installed.length && !args.outputDir) {
    process.stdout.write(
      "\nNo Claude or Pi installation was detected. Use --output-dir <dir> to install the giraffe skill manually.\n",
    )
    return ctx
  }

  const lines = []

  if (installed.length) {
    lines.push("Installed giraffe skill:")
    lines.push(...installed.map(({ agent, skillPath }) => `- ${agent}: ${skillPath}`))
  }

  if (skipped.length && !args.outputDir) {
    if (lines.length) lines.push("")
    lines.push("Skipped:")
    lines.push(...skipped.map((agent) => `- ${agent}: not detected`))
  }

  process.stdout.write(`\n${lines.join("\n")}\n`)
  return ctx
}
