import fs from "fs"

export default function writeValueToTmpFile(ctx) {
  const { tmpFilePath } = ctx

  return {
    ...ctx,
    content: fs.readFileSync(tmpFilePath, "utf8"),
  }
}
