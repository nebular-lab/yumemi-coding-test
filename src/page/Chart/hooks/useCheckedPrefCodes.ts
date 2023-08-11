import { useState } from 'react'

export const useCheckedPrefCodes = () => {
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<number[]>([])
  const toggleCheckedPrefCodes = (prefCode: number) => {
    if (checkedPrefCodes.includes(prefCode)) {
      setCheckedPrefCodes(checkedPrefCodes.filter((code) => code !== prefCode))
    } else {
      setCheckedPrefCodes([...checkedPrefCodes, prefCode].sort((a, b) => a - b)) //昇順
    }
  }
  return { checkedPrefCodes, toggleCheckedPrefCodes }
}
