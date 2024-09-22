import meow from "meow"

export default function processArgv(ctx) {
  const cli = meow(
    `
    Usage
      $ giraffe

    Options
      --collections  ~/path/to/collections

    Examples
      $ giraffe
    `,
    {
      importMeta: import.meta,
    },
  )
  return { ...ctx, args: cli.flags }
}
