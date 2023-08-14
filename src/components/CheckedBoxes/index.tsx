import { FC } from 'react'

type Props = {
  prefectures: string[]
  checkedPrefCodes: number[]
  toggleCheckedPrefCodes: (prefCode: number) => void
}

const CheckBoxes: FC<Props> = (props) => {
  const { prefectures, checkedPrefCodes, toggleCheckedPrefCodes } = props

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {prefectures.map((prefecture, index) => (
        <div key={prefecture}>
          <input
            type='checkbox'
            checked={checkedPrefCodes.includes(index + 1)}
            onChange={() => toggleCheckedPrefCodes(index + 1)}
          />
          <label>{prefecture}</label>
        </div>
      ))}
    </div>
  )
}
export default CheckBoxes
