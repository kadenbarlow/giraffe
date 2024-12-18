/* eslint-disable perfectionist/sort-objects */

const DEFAULT_SETTINGS = {
  collections: {
    folderPath: `${process.env.HOME}/.config/giraffe/collections`,
  },
  history: {
    filePath: `${process.env.HOME}/.config/giraffe/history.json`,
    requestLimit: 100,
  },
  requests: {
    retryCount: 3,
    retryDelay: 500,
  },
  theme: {
    // User interface colors
    accent: "#FAB387",
    background: "#0F111A",
    error: "#F38BA8",
    info: "#FFFFFF",
    primary: "#5E81AC",
    secondary: "#8FBCBB",
    success: "#A6E3A1",
    warning: "#FAB387",

    boxBorder: "#FAB387",
    keyboardShortcut: "#FAB387",
    keyboardShortcutText: "#FFFFFF",
    tab: "#FFFFFF",
    tabKey: "#FAB387",
    urlLabel: "#FFFFFF",
    urlInputBackground: "#1d2133",

    // Syntax highlighting colors
    attribute: "#5E81AC",
    keyword: "#FAB387",
    kwarg: "#89dceb",
    number: "#89b4fa",
    string: "#A6E3A1",
    type: "#cba6f7",
    variable: "#89b4fa",
  },
}

export default DEFAULT_SETTINGS
