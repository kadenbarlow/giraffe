import fs from "fs/promises"
import path from "path"

function shellQuote(value) {
  return `'${String(value).replaceAll("'", `'"'"'`)}'`
}

function createExecutableCommand() {
  return `node ${shellQuote(path.resolve(process.argv[1]))}`
}

function createSkillContent(command) {
  return `---
name: giraffe
description: Inspect GraphQL schemas and execute GraphQL requests with the local Giraffe CLI. Use when you need to discover queries or mutations, inspect an operation, or test a GraphQL server.
---

# Giraffe

Use this local Giraffe CLI command when working with GraphQL from the terminal:

\`\`\`bash
${command}
\`\`\`

If the command is not available on the machine, install it with:

\`\`\`bash
npm install -g @kadenbarlow/giraffe
\`\`\`

## When to use this skill

Use this skill when you need to:
- list available GraphQL queries and mutations
- inspect a generated query or mutation and its variable shape
- execute GraphQL requests against a local or remote server
- load URL and headers from a saved Giraffe request file

## Introspect a schema

List queries and mutations:

\`\`\`bash
${command} introspect --url <url>
\`\`\`

Filter by operation type:

\`\`\`bash
${command} introspect --url <url> --type query
${command} introspect --url <url> --type mutation
\`\`\`

Inspect a single operation:

\`\`\`bash
${command} introspect --url <url> --name <operation> --type query|mutation
\`\`\`

Load URL and headers from a saved request:

\`\`\`bash
${command} introspect --request <file>
\`\`\`

## Execute a request

Run a raw query:

\`\`\`bash
${command} request --url <url> --query 'query { viewer { id } }'
\`\`\`

Run a generated operation:

\`\`\`bash
${command} request --url <url> --name <operation> --type query|mutation --variables '{}'
\`\`\`

Run from a saved request file:

\`\`\`bash
${command} request --request <file>
\`\`\`

## Recommended workflow

1. Run introspect with a URL to list available operations.
2. Inspect a specific operation with \`--name\` and \`--type\`.
3. Copy the variable shape from introspect output.
4. Run the matching request command with correctly shaped variables.

## Notes

- When using \`--name\`, include \`--type query\` or \`--type mutation\`.
- \`introspect\` shows the variable structure expected by generated operations.
- \`request\` expects GraphQL variables JSON, not flattened field arguments.
- \`--request <file>\` loads URL, headers, query, and variables from a saved request file.
`
}

export default async function installSkill(ctx) {
  const command = createExecutableCommand()
  const skillContent = createSkillContent(command)
  const installed = []

  for (const target of ctx.targets) {
    await fs.mkdir(target.dir, { recursive: true })
    const skillPath = path.join(target.dir, "SKILL.md")
    await fs.writeFile(skillPath, skillContent)
    installed.push({ ...target, skillPath })
  }

  return { ...ctx, installed }
}
