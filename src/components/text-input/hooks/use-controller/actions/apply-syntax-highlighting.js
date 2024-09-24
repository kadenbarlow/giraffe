import syntaxHighlight from "#lib/syntax-highlight.js"

export default function applySyntaxHighlighting(ctx) {
  const { formattedValue, syntax, syntaxTheme } = ctx
  return {
    ...ctx,
    formattedValue:
      syntax && syntaxTheme
        ? syntaxHighlight(formattedValue, {
            language: syntax,
            theme: syntaxTheme,
          })
        : formattedValue,
  }
}
