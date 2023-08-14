import PopulationChart from './components/Chart'
import CheckBoxes from './components/CheckedBoxes'
import { useQueryPrefecturePopulation } from './api/getPrefecture'
import LabelSelectRadioButton from './components/LabelSelectRadioButton'
import { useState } from 'react'

const ChartPage = () => {
  const { data } = useQueryPrefecturePopulation()

  const [checkedPrefCodes, setCheckPrefCodes] = useState<number[]>([])
  const [selectedLabelIndex, setSelectedLabelIndex] = useState<number>(0)

  if (!data) return null // TODO これをsuspenseに任せたい

  const toggleCheckedPrefCodes = (prefCode: number) => {
    if (checkedPrefCodes.includes(prefCode)) {
      setCheckPrefCodes(
        checkedPrefCodes.filter(
          (checkedPrefCode) => checkedPrefCode !== prefCode,
        ),
      )
    } else {
      setCheckPrefCodes([...checkedPrefCodes, prefCode])
    }
  }

  return (
    <div>
      <CheckBoxes
        prefectures={data.prefectures}
        checkedPrefCodes={checkedPrefCodes}
        toggleCheckedPrefCodes={toggleCheckedPrefCodes}
      />
      <LabelSelectRadioButton
        labels={data.populationTypeLabels}
        selectedLabelIndex={selectedLabelIndex}
        setSelectedLabelIndex={setSelectedLabelIndex}
      />
      <PopulationChart
        checkedPrefCodes={checkedPrefCodes}
        populationTypeLabels={data.populationTypeLabels}
        selectedLabelIndex={selectedLabelIndex}
        populations={data.populations}
        years={data.years}
        prefectures={data.prefectures}
      />
    </div>
  )
}
export default ChartPage
