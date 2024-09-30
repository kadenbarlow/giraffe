import chalk from "chalk"

export default function applyCursor(ctx) {
  const { cursorOffset, focus, value } = ctx

  if (focus) {
    let highlightPosition = cursorOffset.x

    let content = value[highlightPosition] || " "
    if (value[highlightPosition] === "\n") {
      content = chalk.inverse(" ") + content
    } else {
      content = chalk.inverse(content)
    }

    const newDisplayValue = value.slice(0, highlightPosition) + content + value.slice(highlightPosition + 1)

    return {
      ...ctx,
      formattedValue: newDisplayValue,
    }
  }
  return { ...ctx, formattedValue: value }
}
