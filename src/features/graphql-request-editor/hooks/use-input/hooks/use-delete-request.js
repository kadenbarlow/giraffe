import fs from "fs/promises"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useConfig from "#stores/use-config/index.js"

export default function useDeleteRequest() {
  const setRequest = useRequestStore((state) => state.setRequest)

  const deleteRequest = async () => {
    const { filePath } = useRequestStore.getState()
    const folderPath = useConfig.getState().collections.folderPath

    if (filePath) {
      await fs.unlink(`${folderPath}${filePath.startsWith("/") ? "" : "/"}${filePath}`)
    }

    setRequest({
      filePath: "",
      headers: "{}",
      info: JSON.stringify({ description: "", filePath: "new-request.json", name: "" }, null, 2),
      query: "",
      url: "",
      variables: "{}",
    })
  }

  return { deleteRequest }
}
