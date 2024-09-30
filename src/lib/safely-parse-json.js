export default function safelyParseJson(json) {
  try {
    return JSON.parse(json)
  } catch (error) {
    return null
  }
}
