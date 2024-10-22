export default async function sendGraphqlRequest(ctx) {
  const { headers, query, url, variables } = ctx

  const response = await fetch(url, {
    body: JSON.stringify({
      query,
      variables: variables ? JSON.parse(variables) : {},
    }),
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/json",
      "User-Agent": "GiraffeClient/0.1.1",
      ...JSON.parse(headers),
    },
    method: "POST",
  })

  return { ...ctx, response }
}
