import { useWindowSize } from "ink"

const useScreenSize = () => {
  const { columns, rows } = useWindowSize()

  return {
    // Keep one spare row to avoid terminal reflow glitches while resizing.
    height: Math.max(rows - 1, 0),
    width: columns,
  }
}

export default useScreenSize
