import syntaxHighlight from "#lib/syntax-highlight.js"

export default function applySyntaxHighlighting(ctx) {
  const { displayValue, syntax, syntaxTheme } = ctx
  return {
    ...ctx,
    displayValue:
      syntax && syntaxTheme
        ? syntaxHighlight(displayValue, {
            language: syntax,
            theme: syntaxTheme,
          })
        : displayValue,
  }
}
