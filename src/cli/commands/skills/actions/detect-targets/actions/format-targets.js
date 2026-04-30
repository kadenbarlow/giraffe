export default async function formatTargets(ctx) {
  const { candidates } = ctx

  return {
    ...ctx,
    skipped: candidates.filter((candidate) => !candidate.detected).map(({ agent }) => agent),
    targets: candidates.filter((candidate) => candidate.detected).map(({ agent, dir }) => ({ agent, dir })),
  }
}
