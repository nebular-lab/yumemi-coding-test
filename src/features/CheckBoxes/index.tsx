import { FC } from 'react'
import { Prefecture } from '../../type'
import { useCheckedPrefCodes } from '../../page/Chart/hooks/useCheckedPrefCodes'

type Props = {
  prefectures: Prefecture[]
  checkedPrefCodes: number[]
  toggleCheckedPrefCodes: (prefCode: number) => void
}

const CheckBoxes: FC<Props> = (props) => {
  const { prefectures, checkedPrefCodes, toggleCheckedPrefCodes } = props

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {prefectures.map((prefecture) => (
        <div>
          <input
            type='checkbox'
            checked={checkedPrefCodes.includes(prefecture.prefCode)}
            onChange={() => toggleCheckedPrefCodes(prefecture.prefCode)}
          />
          <label>{prefecture.prefName}</label>
        </div>
      ))}
    </div>
  )
}
export default CheckBoxes
