import fs from "fs/promises"
import useConfig from "#stores/use-config/index.js"

export default async function updateHistory(ctx) {
  const { headers, parsedResponse, query, startTime, url, variables } = ctx
  const { history: historySettings } = useConfig.getState()

  let history
  try {
    const historyFileContents = await fs.readFile(historySettings.filePath, "utf8")
    history = JSON.parse(historyFileContents)
  } catch (error) {
    history = { requests: [] }
  }

  history.requests.unshift({
    datetime: startTime.toISOString(),
    headers,
    query,
    response: JSON.stringify(parsedResponse.json, null, 2),
    responseBodySize: parsedResponse.bodySize,
    responseSize: parsedResponse.responseSize,
    responseTime: parsedResponse.responseTime,
    status: parsedResponse.status,
    statusText: parsedResponse.statusText,
    url,
    variables,
  })
  history.requests = history.requests.slice(0, Math.min(historySettings.requestLimit, history.requests.length))
  await fs.mkdir(historySettings.filePath.split("/").slice(0, -1).join("/"), { recursive: true })
  await fs.writeFile(historySettings.filePath, JSON.stringify(history, null, 2))

  return ctx
}
