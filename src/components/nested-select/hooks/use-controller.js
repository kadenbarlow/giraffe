import { useInput } from "ink"
import { useMemo, useState } from "react"

export default function useController({ disabled, focus, onSelect, options, ...props }) {
  const [search, setSearch] = useState("")
  const [selectedOption, setSelectedOption] = useState(null)

  const flattenedOptions = useMemo(() => {
    function getKeys(option) {
      if (option.key) {
        if (search && !option.label.toLowerCase().includes(search.toLowerCase())) return null
        return option
      } else {
        return Object.values(option).flatMap(getKeys)
      }
    }

    return [null, ...Object.values(options).flatMap(getKeys).filter(Boolean)]
  }, [options, search])

  useInput(
    (_input, key) => {
      if (key.upArrow) {
        setSelectedOption(
          flattenedOptions[Math.max(flattenedOptions.findIndex((o) => o?.key === selectedOption?.key) - 1, 0)],
        )
      } else if (key.downArrow) {
        setSelectedOption(
          flattenedOptions[
            Math.min(flattenedOptions.findIndex((o) => o?.key === selectedOption?.key) + 1, flattenedOptions.length - 1)
          ],
        )
      }
    },
    { isActive: focus },
  )

  return {
    disabled,
    focus,
    onSelect,
    options,
    props,
    search,
    selectedOption,
    setSearch,
  }
}
