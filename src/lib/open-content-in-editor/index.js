import pipe from "#lib/pipe/index.js"
import { openTmpFileInEditor, readContentFromTmpFile, writeContentToTmpFile } from "./actions/index.js"

export default function openContentInEditor({ content, fileType }) {
  return pipe.async(
    writeContentToTmpFile,
    openTmpFileInEditor,
    readContentFromTmpFile,
    ({ content }) => content,
  )({ content, fileType, tmpFilePath: null })
}
