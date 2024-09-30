export default function json(hljs) {
  const ATTRIBUTE = {
    begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
    className: "attribute",
    relevance: 1.01,
  }

  const LITERALS = ["true", "false", "null"]

  const LITERALS_MODE = {
    beginKeywords: LITERALS.join(" "),
    scope: "literal",
  }

  return {
    aliases: ["jsonc", "json"],
    contains: [
      ATTRIBUTE,
      hljs.QUOTE_STRING_MODE,
      LITERALS_MODE,
      hljs.C_NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
    ],
    illegal: ["\x1B.*?m", "\\S"],
    keywords: {
      literal: LITERALS,
    },
    name: "JSON",
  }
}
