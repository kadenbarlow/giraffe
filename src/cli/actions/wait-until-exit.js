export default async function waitUntilExit(ctx) {
  const { appInstance } = ctx
  await appInstance.waitUntilExit()
  return ctx
}
