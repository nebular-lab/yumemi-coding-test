import { FC } from 'react'
import { Prefecture } from '../../types'

type Props = {
  prefectures: Prefecture[]
  checkedPrefCodes: number[]
  toggleCheckedPrefCodes: (prefCode: number) => void
}

const CheckBoxGroup: FC<Props> = (props) => {
  const { prefectures, checkedPrefCodes, toggleCheckedPrefCodes } = props

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {prefectures.map((prefecture, index) => (
        <div key={prefecture.prefCode}>
          <input
            id={prefecture.prefName}
            type='checkbox'
            checked={checkedPrefCodes.includes(index + 1)}
            onChange={() => toggleCheckedPrefCodes(index + 1)}
          />
          <label htmlFor={prefecture.prefName}>{prefecture.prefName}</label>
        </div>
      ))}
    </div>
  )
}
export default CheckBoxGroup
