import pipe from "#lib/pipe/index.js"
import detectAgentCandidates from "./actions/detect-agent-candidates.js"
import formatTargets from "./actions/format-targets.js"
import resolveOutputDirTarget from "./actions/resolve-output-dir-target.js"

export default async function detectTargets(ctx) {
  return pipe.async(resolveOutputDirTarget, detectAgentCandidates, formatTargets)(ctx)
}
