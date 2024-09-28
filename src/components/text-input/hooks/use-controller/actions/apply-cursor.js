import chalk from "chalk"

export default function applyCursor(ctx) {
  const { cursorOffset, focus, unformattedValue } = ctx

  if (focus) {
    let highlightPosition = cursorOffset.x

    let content = unformattedValue[highlightPosition] || " "
    if (unformattedValue[highlightPosition] === "\n") {
      content = chalk.inverse(" ") + content
    } else {
      content = chalk.inverse(content)
    }

    const newDisplayValue =
      unformattedValue.slice(0, highlightPosition) + content + unformattedValue.slice(highlightPosition + 1)

    return {
      ...ctx,
      formattedValue: newDisplayValue,
    }
  }
  return { ...ctx, formattedValue: unformattedValue }
}
