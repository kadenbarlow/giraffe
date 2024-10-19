export default async function parseResponse(ctx) {
  const { response, startTime } = ctx

  const rawBody = await response.text()
  const headerContent = Object.entries(Object.fromEntries(response.headers)).reduce(
    (headers, [key, value]) => (headers += `${key}: ${value}`),
    "",
  )

  return {
    ...ctx,
    parsedResponse: {
      bodySize: rawBody.length,
      headers: headerContent,
      json: JSON.parse(rawBody),
      responseSize: (headerContent + rawBody).length,
      responseTime: new Date() - startTime,
      status: response.status,
      statusText: response.statusText,
    },
  }
}
