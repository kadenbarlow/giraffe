import chalk from "chalk"

export default function applyCursor(ctx) {
  const { cursorOffset, focus, formattedValue, insertion } = ctx

  if (focus) {
    let adjustedCursorOffset = cursorOffset.formattedXOffset
    while (formattedValue[adjustedCursorOffset] === "\x1B" && formattedValue[adjustedCursorOffset + 1] === "[") {
      adjustedCursorOffset = formattedValue.indexOf("m", adjustedCursorOffset) + 1
    }
    while (formattedValue[adjustedCursorOffset] === "m" && !isNaN(formattedValue[adjustedCursorOffset - 1])) {
      adjustedCursorOffset = formattedValue.lastIndexOf("\x1B", adjustedCursorOffset) - 1
    }

    if (insertion) adjustedCursorOffset += 1
    while (formattedValue[adjustedCursorOffset] === "\x1B" && formattedValue[adjustedCursorOffset + 1] === "[") {
      adjustedCursorOffset = formattedValue.indexOf("m", adjustedCursorOffset) + 1
    }
    while (formattedValue[adjustedCursorOffset] === "m" && !isNaN(formattedValue[adjustedCursorOffset - 1])) {
      adjustedCursorOffset = formattedValue.lastIndexOf("\x1B", adjustedCursorOffset) - 1
    }

    const newDisplayValue =
      formattedValue.slice(0, adjustedCursorOffset) +
      chalk.inverse(formattedValue[adjustedCursorOffset] || " ") +
      formattedValue.slice(adjustedCursorOffset + 1)

    return {
      ...ctx,
      cursorOffset: {
        ...cursorOffset,
        formattedXOffset: adjustedCursorOffset,
      },
      formattedValue: newDisplayValue,
    }
  }
  return ctx
}
