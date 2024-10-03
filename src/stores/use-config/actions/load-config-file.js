import fs from "fs"

export default function loadConfigFile(ctx) {
  const { configFilePath } = ctx
  if (!configFilePath) return ctx

  return {
    ...ctx,
    config: JSON.parse(fs.readFileSync(configFilePath, "utf8")),
  }
}
