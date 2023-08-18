import { FC } from 'react'

type Props = {
  labels: string[]
  selectedLabelIndex: number
  setSelectedLabelIndex: (index: number) => void
}

const SelectButtonGroup: FC<Props> = (props) => {
  const { labels, selectedLabelIndex, setSelectedLabelIndex } = props

  return (
    <div>
      {labels.map((label, index) => (
        <label key={label} htmlFor={label}>
          <input
            type='radio'
            id={label}
            value={label}
            checked={selectedLabelIndex === index}
            onChange={() => setSelectedLabelIndex(index)}
          />
          {label}
        </label>
      ))}
    </div>
  )
}
export default SelectButtonGroup
