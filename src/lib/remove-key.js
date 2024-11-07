export default function removeKey(obj, keyName) {
  if (typeof obj !== "object" || obj === null) return obj
  if (Array.isArray(obj)) obj.map((item) => removeKey(item, keyName))

  return Object.entries(obj).reduce((result, [key, value]) => {
    if (key !== keyName) result[key] = removeKey(value, keyName)
    return result
  }, {})
}
