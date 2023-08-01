import { useState } from 'react'

export const useCheckedPrefCodes = () => {
  const [checkedPrefCodes, setCheckedPrefCodes] = useState<number[]>([])
  const toggleCheckedPrefCodes = (prefCode: number) => {
    if (checkedPrefCodes.includes(prefCode)) {
      setCheckedPrefCodes(checkedPrefCodes.filter((code) => code !== prefCode))
    } else {
      setCheckedPrefCodes([...checkedPrefCodes, prefCode])
    }
  }
  // TODO ここでuseCallbackを使う
  return { checkedPrefCodes, toggleCheckedPrefCodes }
}
