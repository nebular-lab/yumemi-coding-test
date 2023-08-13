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

  const allPrefectures = data.prefecturePopulations.map(
    (prefecturePopulation) => prefecturePopulation.prefecture,
  )
  const checkedPrefectures = data.prefecturePopulations.filter(
    (prefecturePopulation) =>
      checkedPrefCodes.includes(prefecturePopulation.prefecture.prefCode),
  )

  return (
    <div>
      <CheckBoxes
        prefectures={allPrefectures}
        checkedPrefCodes={checkedPrefCodes}
        toggleCheckedPrefCodes={toggleCheckedPrefCodes}
      />
      <LabelSelectRadioButton
        labels={data.labels}
        selectedLabelIndex={selectedLabelIndex}
        setSelectedLabelIndex={setSelectedLabelIndex}
      />
      <PopulationChart
        checkedPrefectures={checkedPrefectures}
        labels={data.labels}
        selectedLabelIndex={selectedLabelIndex}
      />
    </div>
  )
}
export default ChartPage
