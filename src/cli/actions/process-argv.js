import meow from "meow"

export default function processArgv(ctx) {
  const cli = meow("", {
    autoHelp: false,
    flags: {
      collections: { type: "string" },
      headers: { type: "string" },
      help: { shortFlag: "h", type: "boolean" },
      name: { type: "string" },
      outputDir: { type: "string" },
      query: { type: "string" },
      request: { type: "string" },
      type: { type: "string" },
      url: { type: "string" },
      variables: { type: "string" },
    },
    importMeta: import.meta,
  })

  const command = cli.flags.help ? "help" : cli.input[0] || null

  return {
    ...ctx,
    args: cli.flags,
    command,
    helpTarget: cli.flags.help ? cli.input[0] || null : null,
  }
}
