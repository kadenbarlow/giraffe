import { useStdout } from "ink"
import { useCallback, useEffect, useState } from "react"

const useScreenSize = () => {
  const { stdout } = useStdout()

  // using stdout.rows - 1 to avoid long term ink issue
  // https://github.com/vadimdemedes/ink/issues/450
  // https://github.com/vadimdemedes/ink/issues/359
  const getSize = useCallback(
    () => ({
      height: stdout.rows - 1,
      width: stdout.columns,
    }),
    [stdout],
  )

  const [size, setSize] = useState(getSize)

  useEffect(() => {
    const onResize = () => setSize(getSize())
    stdout.on("resize", onResize)
    return () => stdout.off("resize", onResize)
  }, [stdout, getSize])

  return size
}

export default useScreenSize
