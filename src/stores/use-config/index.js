import { create } from "zustand"
import pipe from "#lib/pipe/index.js"
import { findConfigFile, loadConfigFile, mergeConfigWithDefaultSettings } from "./actions/index.js"

const config = pipe.sync(
  findConfigFile,
  loadConfigFile,
  mergeConfigWithDefaultSettings,
  ({ config }) => config,
)({ config: {}, configFilePath: null })

const useConfig = create(() => ({
  ...config,
}))

export default useConfig
