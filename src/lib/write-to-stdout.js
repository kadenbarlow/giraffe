export default async function writeToStdout(content) {
  return new Promise((resolve, reject) => {
    process.stdout.write(content, (error) => {
      if (error) reject(error)
      else resolve()
    })
  })
}
