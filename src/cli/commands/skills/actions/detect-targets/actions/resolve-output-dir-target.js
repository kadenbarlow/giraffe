import path from "path"

function resolveSkillDirectory(outputDir) {
  const resolved = path.resolve(outputDir)
  return path.basename(resolved) === "giraffe" ? resolved : path.join(resolved, "giraffe")
}

export default async function resolveOutputDirTarget(ctx) {
  const { args } = ctx

  if (!args.outputDir) return ctx

  return {
    ...ctx,
    candidates: [{ agent: "custom", detected: true, dir: resolveSkillDirectory(args.outputDir) }],
  }
}
