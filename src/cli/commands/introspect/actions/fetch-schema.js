import { buildClientSchema, getIntrospectionQuery } from "graphql"

export default async function fetchSchema(ctx) {
  const { headers, url } = ctx

  const response = await fetch(url, {
    body: JSON.stringify({ query: getIntrospectionQuery() }),
    headers: {
      "Content-Type": "application/json",
      ...JSON.parse(headers),
    },
    method: "POST",
  })

  const { data, errors } = await response.json()
  if (errors?.length) throw new Error(JSON.stringify(errors, null, 2))

  return {
    ...ctx,
    schema: buildClientSchema(data),
  }
}
