export default function validateArgs(ctx) {
  const { args } = ctx

  if (args.outputDir && typeof args.outputDir !== "string") {
    throw new Error("--output-dir must be a directory path")
  }

  return ctx
}
