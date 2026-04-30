---
name: giraffe
description: Inspect GraphQL schemas and execute GraphQL requests with the local Giraffe CLI. Use when you need to discover queries or mutations, inspect an operation, or test a GraphQL server.
---

# Giraffe

Use this local Giraffe CLI command when working with GraphQL from the terminal:

```bash
node '/Users/kadenbarlow/Documents/projects/giraffe-client/dist/cli/index.js'
```

## When to use this skill

Use this skill when you need to:
- list available GraphQL queries and mutations
- inspect a generated query or mutation and its variable shape
- execute GraphQL requests against a local or remote server
- load URL and headers from a saved Giraffe request file

## Introspect a schema

List queries and mutations:

```bash
node '/Users/kadenbarlow/Documents/projects/giraffe-client/dist/cli/index.js' introspect --url <url>
```

Filter by operation type:

```bash
node '/Users/kadenbarlow/Documents/projects/giraffe-client/dist/cli/index.js' introspect --url <url> --type query
node '/Users/kadenbarlow/Documents/projects/giraffe-client/dist/cli/index.js' introspect --url <url> --type mutation
```

Inspect a single operation:

```bash
node '/Users/kadenbarlow/Documents/projects/giraffe-client/dist/cli/index.js' introspect --url <url> --name <operation> --type query|mutation
```

Load URL and headers from a saved request:

```bash
node '/Users/kadenbarlow/Documents/projects/giraffe-client/dist/cli/index.js' introspect --request <file>
```

## Execute a request

Run a raw query:

```bash
node '/Users/kadenbarlow/Documents/projects/giraffe-client/dist/cli/index.js' request --url <url> --query 'query { viewer { id } }'
```

Run a generated operation:

```bash
node '/Users/kadenbarlow/Documents/projects/giraffe-client/dist/cli/index.js' request --url <url> --name <operation> --type query|mutation --variables '{}'
```

Run from a saved request file:

```bash
node '/Users/kadenbarlow/Documents/projects/giraffe-client/dist/cli/index.js' request --request <file>
```

## Recommended workflow

1. Run introspect with a URL to list available operations.
2. Inspect a specific operation with `--name` and `--type`.
3. Copy the variable shape from introspect output.
4. Run the matching request command with correctly shaped variables.

## Notes

- When using `--name`, include `--type query` or `--type mutation`.
- `introspect` shows the variable structure expected by generated operations.
- `request` expects GraphQL variables JSON, not flattened field arguments.
- `--request <file>` loads URL, headers, query, and variables from a saved request file.
