import fs from "fs/promises"
import path from "path"

function createExecutableCommand() {
  return "giraffe"
}

function createSkillContent(command) {
  return `---
name: giraffe
description: Inspect GraphQL schemas and execute GraphQL requests with the Giraffe CLI. Use when you need to discover queries or mutations, inspect an operation, or test a GraphQL server.
---

# Giraffe

Use this Giraffe CLI command when working with GraphQL from the terminal:

\`\`\`bash
${command}
\`\`\`

## When to use this skill

Use this skill when you need to:
- list available GraphQL queries and mutations
- inspect a generated query or mutation and its variable shape
- execute GraphQL requests against a local or remote server
- load URL and headers from a saved Giraffe request file
- find the right saved collection for an environment or user

## Find a saved request

List saved collections first when the user refers to an environment or person
collection, or request name instead of giving a URL directly.

\`\`\`bash
${command} list
\`\`\`

This prints file paths followed by request names. Use that output to choose the
right \`--request <file>\` value.

Example: if the user says something like \`login to localhost as admin\`,
first run \`${command} list\`, find the matching saved request such as
\`collection/localhost-admin.json\`, and then use:

\`\`\`bash
${command} introspect --request collection/localhost-admin.json
${command} request --request collection/localhost-admin.json --name <operation> --type mutation --variables '{}'
\`\`\`

Prefer \`--request <file>\` over manually reconstructing the URL and headers
when a saved request already matches the user's environment.

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

1. If the user mentions an environment, app, or person, run \`${command} list\` first.
2. Use the matching saved request with \`--request <file>\` when possible.
3. Run introspect with a URL or saved request to list available operations.
4. Inspect a specific operation with \`--name\` and \`--type\`.
5. Copy the variable shape from introspect output.
6. Run the matching request command with correctly shaped variables.

## Notes

- When using \`--name\`, include \`--type query\` or \`--type mutation\`.
- \`introspect\` shows the variable structure expected by generated operations.
- \`request\` expects GraphQL variables JSON, not flattened field arguments.
- \`list\` is the fastest way to discover saved requests for specific environments like localhost, mydot, or a specific user.
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
