import chalk from "chalk"

export default function applyCursor(ctx) {
  const { cursorOffset, displayValue, focus } = ctx

  if (focus) {
    let adjustedCursorOffset = cursorOffset
    while (displayValue[adjustedCursorOffset] === "\x1B" && displayValue[adjustedCursorOffset + 1] === "[") {
      adjustedCursorOffset = displayValue.indexOf("m", adjustedCursorOffset) + 1
    }
    while (displayValue[adjustedCursorOffset] === "m" && !isNaN(displayValue[adjustedCursorOffset - 1])) {
      adjustedCursorOffset = displayValue.lastIndexOf("\x1B", adjustedCursorOffset) - 1
    }

    const newDisplayValue =
      displayValue.slice(0, adjustedCursorOffset) +
      chalk.inverse(displayValue[adjustedCursorOffset] || " ") +
      displayValue.slice(adjustedCursorOffset + 1)

    return { ...ctx, cursorOffset: adjustedCursorOffset, displayValue: newDisplayValue }
  }
  return ctx
}
