import chalk from "chalk"
import hljs from "highlight.js/lib/core"
import * as parse5 from "parse5"
import * as htmlparser2Adapter from "parse5-htmlparser2-tree-adapter"
import { graphql, json } from "./languages/index.js"

hljs.registerLanguage("graphql", graphql)
hljs.registerLanguage("jsonc", json)

export const plain = (codePart) => codePart

function colorizeNode(node, theme = {}, context) {
  switch (node.type) {
    case "text": {
      const text = node.data
      if (context === undefined) {
        return (theme.default || plain)(text)
      }
      return text
    }
    case "tag": {
      const hljsClass = /hljs-(\w+)/.exec(node.attribs.class)
      if (hljsClass) {
        const token = hljsClass[1]
        const nodeData = node.childNodes.map((node) => colorizeNode(node, theme, token)).join("")
        return (theme[token] || plain)(nodeData)
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
  const html = hljs.highlight(code, { ignoreIllegals: true, language: options.language }).value

  let theme
  if (options.theme) {
    theme = {}
    Object.entries(options.theme || {}).forEach(([key, value]) => {
      theme[key] = chalk.hex(value)
    })
  }

  // return html
  return colorize(html, theme)
}
