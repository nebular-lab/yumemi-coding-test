import { useState } from 'react'

export const useSelectedLabelIndex = () => {
  const [selectedLabelIndex, set] = useState<number>(0)
  const setSelectedLabelIndex = (index: number) => {
    set(index)
  }
  return { selectedLabelIndex, setSelectedLabelIndex }
}
