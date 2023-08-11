import PopulationChart from '../../features/PopulationChart'
import CheckBoxes from '../../features/CheckBoxes'
import { useQueryPrefecturePopulation } from './api/getPrefecture'
import LabelSelectRadioButton from '../../features/LabelSelectRadioButton'
import { useState } from 'react'

const ChartPage = () => {
  const { data, isLoading } = useQueryPrefecturePopulation()

  const [checkedPrefCodes, setCheckPrefCode] = useState<number[]>([])
  const [selectedLabelIndex, setSelectedLabelIndex] = useState<number>(0)
  
  const toggleCheckedPrefCodes = (prefCode: number) => {
    if (checkedPrefCodes.includes(prefCode)) {
      setCheckPrefCode(checkedPrefCodes.filter((code) => code !== prefCode))
    } else {
      setCheckPrefCode([...checkedPrefCodes, prefCode])
    }
  }
  if (isLoading) return <div>ロード中</div>
  if (!data) return <div>データがありません</div>

  const allPrefecture = data.populations.map(
    (population) => population.prefecture,
  )
  const checkedPrefectures = data.populations.filter((population) =>
    checkedPrefCodes.includes(population.prefecture.prefCode),
  )

  return (
    <div>
      <h1>ゆめみ コーディングテスト</h1>

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
