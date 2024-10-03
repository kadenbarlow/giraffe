import DEFAULT_SETTINGS from "./default-settings.js"

export default function mergeConfigWithDefaultSettings(ctx) {
  const { config } = ctx

  return {
    ...ctx,
    config: {
      ...DEFAULT_SETTINGS,
      ...config,
    },
  }
}
