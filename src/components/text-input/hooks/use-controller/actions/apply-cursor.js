import chalk from "chalk"

export default function applyCursor(ctx) {
  const { cursorOffset, direction, focus, unformattedValue } = ctx

  if (focus) {
    let highlightPosition = cursorOffset.x
    if (
      unformattedValue[highlightPosition] === "\n" &&
      highlightPosition < unformattedValue.length &&
      highlightPosition > 0
    ) {
      direction === 1 ? highlightPosition++ : highlightPosition--
    }

    let content = unformattedValue[highlightPosition] || " "
    if (unformattedValue[highlightPosition] === "\n") {
      content = content + chalk.inverse(" ")
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
