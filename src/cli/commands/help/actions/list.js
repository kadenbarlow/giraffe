import { bold, command, example, option, section } from "#lib/help-format.js"

const LIST_HELP = [
  "List saved collections without opening the TUI.",
  "",
  "This command prints saved request files using the same collection structure",
  "used by the TUI, showing each request's file path followed by its name.",
  "",
  "Usage: giraffe list [options...]",
  "",
  `$ ${command("giraffe list")}`,
  `$ ${command("giraffe list --collections <dir>")}`,
  "",
  section("Options:", [option("--collections", "Path to the collections directory")].join("\n")),
  "",
  `${bold("Examples")}`,
  example("List saved collections from the default directory", "giraffe list"),
  "",
  example("List saved collections from a custom directory", "giraffe list --collections ./collections"),
  "",
].join("\n")

export default async function list() {
  process.stdout.write(`\n${LIST_HELP}\n`)
}
