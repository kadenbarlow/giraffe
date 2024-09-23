import chalk from "chalk"
import hljs from "highlight.js/lib/core"
import * as parse5 from "parse5"
import * as htmlparser2Adapter from "parse5-htmlparser2-tree-adapter"

function graphql(hljs) {
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
        scope: "arg",
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
    illegal: [/[;<']/, /BEGIN/],
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

hljs.registerLanguage("graphql", graphql)

export const plain = (codePart) => codePart

export const DEFAULT_THEME = {
  arg: chalk.cyan,
  attribute: chalk.yellow,
  keyword: chalk.blue,
  string: chalk.green,
  type: chalk.red,
  variable: chalk.magenta,
}

function colorizeNode(node, theme = {}, context) {
  switch (node.type) {
    case "text": {
      const text = node.data
      if (context === undefined) {
        return (theme.default || DEFAULT_THEME.default || plain)(text)
      }
      return text
    }
    case "tag": {
      const hljsClass = /hljs-(\w+)/.exec(node.attribs.class)
      if (hljsClass) {
        const token = hljsClass[1]
        const nodeData = node.childNodes.map((node) => colorizeNode(node, theme, token)).join("")
        return (theme[token] || DEFAULT_THEME[token] || plain)(nodeData)
      }

      // Return the data itself when the class name isn't prefixed with a highlight.js token prefix.
      // This is common in instances of sublanguages (JSX, Markdown Code Blocks, etc.)
      return node.childNodes.map((node) => colorizeNode(node, theme)).join("")
    }
  }
  throw new Error("Invalid node type " + node.type)
}

function colorize(code, theme = {}) {
  const fragment = parse5.parseFragment(code, {
    treeAdapter: htmlparser2Adapter,
  })
  return fragment.childNodes.map((node) => colorizeNode(node, theme)).join("")
}

export default function syntaxHighlight(code, options = {}) {
  let html
  if (options.language) {
    html = hljs.highlight(code, { ignoreIllegals: options.ignoreIllegals, language: options.language }).value
  } else {
    html = hljs.highlightAuto(code, options.languageSubset).value
  }
  // return html
  return colorize(html, options.theme)
}
