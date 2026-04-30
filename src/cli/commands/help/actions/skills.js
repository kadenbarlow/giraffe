import { bold, command, example, option, section } from "#lib/help-format.js"

const SKILLS_HELP = [
  "Install agent skills for working with a local Giraffe CLI.",
  "",
  "This command auto-detects supported agents and installs a /giraffe skill",
  "when compatible Claude or Pi installations are found on the machine.",
  "",
  "If --output-dir is provided, the skill is written only to that directory so",
  "they can be used with agents that are not auto-detected.",
  "",
  "Usage: giraffe skills [options...]",
  "",
  `$ ${command("giraffe skills")}`,
  `$ ${command("giraffe skills --output-dir <dir>")}`,
  "",
  section("Options:", [option("--output-dir", "Install skills only into the specified directory")].join("\n")),
  "",
  `${bold("Examples")}`,
  example("Auto-detect installed agents and install available skills", "giraffe skills"),
  "",
  example("Install skills into a custom directory for another agent", "giraffe skills --output-dir ./skills"),
  "",
].join("\n")

export default async function skills() {
  process.stdout.write(`\n${SKILLS_HELP}\n`)
}
