import highlight from "#lib/syntax-highlighting/index.js"

export default function applySyntaxHighlighting(ctx) {
  const { formattedValue, syntax, syntaxTheme } = ctx
  return {
    ...ctx,
    formattedValue:
      syntax && syntaxTheme
        ? highlight(formattedValue, {
            language: syntax,
            theme: syntaxTheme,
          })
        : formattedValue,
  }
}
