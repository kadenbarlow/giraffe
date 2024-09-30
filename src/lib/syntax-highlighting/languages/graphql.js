export default function graphql(hljs) {
  return {
    aliases: ["gql"],
    case_insensitive: true,
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      {
        begin: ":\\s+",
        end: "\\w+!*",
        excludeBegin: true,
        scope: "type",
      },
      {
        begin: "\\$\\w+",
        scope: "variable",
      },
      {
        match: "\\w+:",
        scope: "kwarg",
      },
      {
        match: '\\".*\\"',
        scope: "string",
      },
      {
        illegal: "\\s",
        keywords: {
          keyword: [
            "query",
            "mutation",
            "subscription",
            "type",
            "schema",
            "directive",
            "interface",
            "union",
            "scalar",
            "fragment",
            "enum",
            "on",
          ],
          variable: ["true", "false", "null"],
        },
        match: "[a-zA-Z]+",
        scope: "attribute",
      },
    ],
    disableAutodetect: false,
    illegal: [/[;<']/, /BEGIN/, "\x1B.*?m"],
    keywords: {
      keyword: [
        "query",
        "mutation",
        "subscription",
        "type",
        "schema",
        "directive",
        "interface",
        "union",
        "scalar",
        "fragment",
        "enum",
        "on",
      ],
      variable: ["true", "false", "null"],
    },
    name: "GraphQL",
  }
}
