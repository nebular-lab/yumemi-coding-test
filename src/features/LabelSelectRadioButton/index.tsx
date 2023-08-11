import { FC } from 'react'

type Props = {
  labels: string[]
  selectedLabelIndex: number
  setSelectedLabelIndex: (index: number) => void
}

const LabelSelectRadioButton: FC<Props> = (props) => {
  const { labels, selectedLabelIndex, setSelectedLabelIndex } = props

  return (
    <div>
      {labels.map((label, index) => (
        <label key={label}>
          <input
            type='radio'
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
export default LabelSelectRadioButton
