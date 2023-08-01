import { useState } from 'react'
import PopulationChart from '../../features/PopulationChart'
import CheckBoxes from '../../features/CheckBoxes'
import DataTypeSelector from '../../features/DataTypeSelector'
import { useQueryPrefecturePopulation } from './api/getPrefecture'
import { useCheckedPrefCodes } from './hooks/useCheckedPrefCodes'

const ChartPage = () => {
  const { data, isLoading, error } = useQueryPrefecturePopulation()
  const { checkedPrefCodes, toggleCheckedPrefCodes } = useCheckedPrefCodes()
  const prefectures = data?.map((dataItem) => dataItem.prefecture)
  const checkedPrefectureDatas = data?.filter((dataItem) =>
    checkedPrefCodes.includes(dataItem.prefecture.prefCode),
  )
  if (isLoading) return <div>ロード中</div>
  console.log(data)
  return (
    <div>
      <h1>ゆめみ コーディングテスト</h1>

      <CheckBoxes
        prefectures={prefectures ?? []}
        checkedPrefCodes={checkedPrefCodes}
        toggleCheckedPrefCodes={toggleCheckedPrefCodes}
      />
      {/* <DataTypeSelector /> */}
      <PopulationChart checkedPrefectureDatas={checkedPrefectureDatas} />
    </div>
  )
}
export default ChartPage
