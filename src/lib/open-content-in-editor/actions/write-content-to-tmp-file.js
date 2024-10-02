import crypto from "crypto"
import fs from "fs"
import os from "os"
import path from "path"

export default function writeValueToTmpFile(ctx) {
  const { content, fileType } = ctx

  const tmpFilePath = path.join(os.tmpdir(), `${crypto.randomUUID()}.${fileType}`)
  fs.writeFileSync(tmpFilePath, content)
  return { ...ctx, tmpFilePath }
}
