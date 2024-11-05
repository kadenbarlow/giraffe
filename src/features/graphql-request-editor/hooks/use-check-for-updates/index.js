import { exec } from "child_process"
import { useEffect } from "react"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"

export default function useCheckForUpdates() {
  const { setToast } = useRequestStore.getState()

  useEffect(
    function initialize() {
      async function checkForUpdates() {
        exec("npm outdated -g | grep @kadenbarlow/giraffe | awk '{print $4}'", (error, stdout) => {
          if (stdout) {
            setToast({
              message: `New version v${stdout.trim()} available!`,
              type: "primary",
            })
          }
        })
      }
      checkForUpdates()
    },
    [setToast],
  )
}
