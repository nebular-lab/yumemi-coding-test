import PopulationChart from '../../features/PopulationChart'
import CheckBoxes from '../../features/CheckBoxes'
import { useQueryPrefecturePopulation } from './api/getPrefecture'
import { useCheckedPrefCodes } from './hooks/useCheckedPrefCodes'
import LabelSelectRadioButton from '../../features/LabelSelectRadioButton'
import { useSelectedLabelIndex } from './hooks/useSelectedLabelIndex'

const ChartPage = () => {
  const { data, isLoading } = useQueryPrefecturePopulation()

  const { checkedPrefCodes, toggleCheckedPrefCodes } = useCheckedPrefCodes()
  const { selectedLabelIndex, setSelectedLabelIndex } = useSelectedLabelIndex()

  if (isLoading) return <div>ロード中</div>
  if (!data) return <div>データがありません</div>

  const allPrefecture = data.populations.map((population) => population.prefecture)
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
