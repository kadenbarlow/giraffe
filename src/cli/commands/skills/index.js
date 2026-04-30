import pipe from "#lib/pipe/index.js"
import { detectTargets, installSkill, printSummary, validateArgs } from "./actions/index.js"

export default async function skills(ctx) {
  return pipe.async(
    validateArgs,
    detectTargets,
    installSkill,
    printSummary,
  )({
    installed: [],
    output: "",
    skipped: [],
    targets: [],
    ...ctx,
  })
}
