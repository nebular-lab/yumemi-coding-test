import PopulationChart from '../../features/PopulationChart'
import CheckBoxes from '../../features/CheckBoxes'
import { useQueryPrefecturePopulation } from './api/getPrefecture'
import { useCheckedPrefCodes } from './hooks/useCheckedPrefCodes'

const ChartPage = () => {
  const { data, isLoading } = useQueryPrefecturePopulation()
  const { checkedPrefCodes, toggleCheckedPrefCodes } = useCheckedPrefCodes()
  const allPrefecture = data?.map((dataItem) => dataItem.prefecture)
  const checkedPrefectures = data?.filter((dataItem) =>
    checkedPrefCodes.includes(dataItem.prefecture.prefCode),
  )
  if (isLoading) return <div>ロード中</div>
  return (
    <div>
      <h1>ゆめみ コーディングテスト</h1>

      <CheckBoxes
        prefectures={allPrefecture ?? []}
        checkedPrefCodes={checkedPrefCodes}
        toggleCheckedPrefCodes={toggleCheckedPrefCodes}
      />
      {/* <DataTypeSelector /> */}
      <PopulationChart checkedPrefectures={checkedPrefectures} />
    </div>
  )
}
export default ChartPage
