import fs from "fs"

const CONFIG_FILE_PATHS = [`${process.env.HOME}/.config/giraffe/giraffe.json`, `${process.env.HOME}/.giraffe.json`]

export default function findConfigFile(ctx) {
  return {
    ...ctx,
    configFilePath: CONFIG_FILE_PATHS.find((configFilePath) => fs.existsSync(configFilePath)),
  }
}
