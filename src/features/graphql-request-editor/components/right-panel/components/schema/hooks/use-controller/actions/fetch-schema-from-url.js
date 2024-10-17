import { buildClientSchema, getIntrospectionQuery } from "graphql"

export default async function fetchSchema(ctx) {
  const { url } = ctx

  const response = await fetch(url, {
    body: JSON.stringify({
      query: getIntrospectionQuery(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })

  const { data } = await response.json()
  return {
    ...ctx,
    schema: buildClientSchema(data),
  }
}
