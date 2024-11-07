import removeKey from "#lib/remove-key.js"

export default async function sendGraphqlRequest(ctx) {
  const { headers, query, url, variables } = ctx

  const response = await fetch(url, {
    body: JSON.stringify({
      query,
      variables: variables ? removeKey(JSON.parse(variables), "__typename") : {},
    }),
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "User-Agent": "GiraffeClient/0.1.7",
      ...JSON.parse(headers),
    },
    method: "POST",
  })

  return { ...ctx, response }
}
