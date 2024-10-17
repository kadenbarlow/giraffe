import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"

async function parseResponse(response, startTime) {
  const rawBody = await response.text()
  const headerContent = Object.entries(Object.fromEntries(response.headers)).reduce(
    (headers, [key, value]) => (headers += `${key}: ${value}`),
    "",
  )
  return {
    bodySize: rawBody.length,
    headers: headerContent,
    json: JSON.parse(rawBody),
    responseSize: (headerContent + rawBody).length,
    responseTime: new Date() - startTime,
    status: response.status,
    statusText: response.statusText,
  }
}

function formatResponseStats(parsedResponse) {
  return (
    `${parsedResponse.status} ${parsedResponse.statusText} - ` +
    `${parsedResponse.responseTime}ms - ` +
    `${parsedResponse.bodySize} bytes | ${parsedResponse.responseSize} bytes`
  )
}

export default async function sendRequest() {
  const { headers, query, setResponse, setToast, url, variables } = useRequestStore.getState()

  try {
    setToast({ message: "Sending request...", type: "info" })
    const startTime = new Date()
    const response = await fetch(url, {
      body: JSON.stringify({
        query,
        variables: variables ? JSON.parse(variables) : {},
      }),
      headers: {
        "cache-control": "no-cache",
        "Content-Type": "application/json",
        "User-Agent": "GiraffeClient/0.0.0",
        ...JSON.parse(headers),
      },
      method: "POST",
    })

    const parsedResponse = await parseResponse(response, startTime)
    setResponse(JSON.stringify(parsedResponse.json, null, 2))
    setToast({
      message: formatResponseStats(parsedResponse),
      type: "success",
    })
  } catch (error) {
    setResponse(error.message)
    if (error.status) {
      setToast({ message: `${error.status} ${error.statusText}`, type: "error" })
    } else {
      setToast({ message: "Request failed", type: "error" })
    }
  }
}
