import PopulationChart from './components/Chart'
import CheckBoxes from './components/CheckBoxes'
import { useQueryPrefecturePopulation } from './api/getPrefecture'
import LabelSelectRadioButton from './components/LabelSelectRadioButton'
import { useState } from 'react'

const ChartPage = () => {
  const { data } = useQueryPrefecturePopulation()

  const [checkedPrefCodes, setCheckPrefCode] = useState<number[]>([])
  const [selectedLabelIndex, setSelectedLabelIndex] = useState<number>(0)

  const toggleCheckedPrefCodes = (prefCode: number) => {
    if (checkedPrefCodes.includes(prefCode)) {
      setCheckPrefCode(checkedPrefCodes.filter((code) => code !== prefCode))
    } else {
      setCheckPrefCode([...checkedPrefCodes, prefCode])
    }
  }

  if (!data) return null

  const allPrefecture = data?.populations.map(
    (population) => population.prefecture,
  )
  const checkedPrefectures = data?.populations.filter((population) =>
    checkedPrefCodes.includes(population.prefecture.prefCode),
  )

  return (
    <div>
      <CheckBoxes
        prefectures={allPrefecture}
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
