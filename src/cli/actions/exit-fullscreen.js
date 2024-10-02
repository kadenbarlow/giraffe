import writeToStdout from "#lib/write-to-stdout.js"

export default async function exitFullscreen(ctx) {
  // https://github.com/vadimdemedes/ink/issues/263
  // uses an ansi escape code to close the alternative buffer
  await writeToStdout("\x1b[?1049l")
  await writeToStdout("\x1bc")
  return ctx
}
