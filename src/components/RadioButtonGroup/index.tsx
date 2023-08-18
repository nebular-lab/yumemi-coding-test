import { FC } from 'react'

type RadioButtonGroupProps = {
  labels: string[]
  selectedLabelIndex: number
  setSelectedLabelIndex: (index: number) => void
}
const RadioButtonGroup: FC<RadioButtonGroupProps> = (props) => {
  const { labels, selectedLabelIndex, setSelectedLabelIndex } = props

  return (
    <div>
      {labels.map((label, index) => (
        <RadioButton
          key={index}
          id={label}
          value={label}
          checked={index === selectedLabelIndex}
          onChange={() => setSelectedLabelIndex(index)}
        />
      ))}
    </div>
  )
}

type RadioButtonProps = {
  id: string
  value: string
  checked: boolean
  onChange: () => void
}
const RadioButton: FC<RadioButtonProps> = ({
  id,
  value,
  checked,
  onChange,
}) => (
  <label htmlFor={id}>
    <input
      type='radio'
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    {value}
  </label>
)

export default RadioButtonGroup
