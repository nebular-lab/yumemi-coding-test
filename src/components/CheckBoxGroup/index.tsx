import { FC } from 'react'
import { Prefecture } from '../../types'

type CheckBoxGroupProps = {
  prefectures: Prefecture[]
  checkedPrefCodes: number[]
  toggleCheckedPrefCodes: (prefCode: number) => void
}
const CheckBoxGroup: FC<CheckBoxGroupProps> = (props) => {
  const { prefectures, checkedPrefCodes, toggleCheckedPrefCodes } = props

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {prefectures.map((prefecture) => (
        <CheckBox
          prefecture={prefecture}
          checkedPrefCodes={checkedPrefCodes}
          toggleCheckedPrefCodes={toggleCheckedPrefCodes}
        />
      ))}
    </div>
  )
}

type CheckBoxProps = {
  prefecture: Prefecture
  checkedPrefCodes: number[]
  toggleCheckedPrefCodes: (prefCode: number) => void
}
const CheckBox = (props: CheckBoxProps) => {
  const { prefecture, checkedPrefCodes, toggleCheckedPrefCodes } = props
  return (
    <div key={prefecture.prefCode}>
      <input
        id={prefecture.prefName}
        type='checkbox'
        checked={checkedPrefCodes.includes(prefecture.prefCode)}
        onChange={() => toggleCheckedPrefCodes(prefecture.prefCode)}
      />
      <label htmlFor={prefecture.prefName}>{prefecture.prefName}</label>
    </div>
  )
}

export default CheckBoxGroup
