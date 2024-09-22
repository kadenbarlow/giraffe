import writeToStdout from "#lib/write-to-stdout.js"

export default async function enterFullscreen(ctx) {
  // https://github.com/vadimdemedes/ink/issues/263
  // uses an ansi escape code to swap to an alternative buffer
  await writeToStdout("\x1b[?1049h")
  return ctx
}
