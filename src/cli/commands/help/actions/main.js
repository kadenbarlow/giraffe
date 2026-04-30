import { option, section, usage } from "#lib/help-format.js"

const MAIN_HELP = [
  "Giraffe is a terminal-first GraphQL client.",
  "",
  "Use it interactively in the TUI, or run saved and ad-hoc GraphQL requests directly",
  "from the command line.",
  "",
  "Usage: giraffe [command] [options...]",
  "",
  usage("$ giraffe", "Open the TUI"),
  usage("$ giraffe introspect", "Inspect a schema and list or generate operations"),
  usage("$ giraffe request", "Execute a saved request, raw query, or generated operation"),
  "",
  section(
    "Options:",
    [
      option("--collections", "Path to the collections directory used by the TUI and CLI"),
      option("--help", "Show help message for any command and exit"),
    ].join("\n"),
  ),
  "",
].join("\n")

export default async function main() {
  process.stdout.write(`\n${MAIN_HELP}\n`)
}
