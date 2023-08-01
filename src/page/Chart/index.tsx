import { useState } from 'react'
import Chart from '../../features/Chart'
import CheckBoxes from '../../features/CheckBoxes'
import DataTypeSelector from '../../features/DataTypeSelector'
import { useQueryPrefecturePopulation } from './api/getPrefecture'
import { useCheckedPrefCodes } from './hooks/useCheckedPrefCodes'

const ChartPage = () => {
  const { data, isLoading, error } = useQueryPrefecturePopulation()
  const { checkedPrefCodes, toggleCheckedPrefCodes } = useCheckedPrefCodes()
  const prefectures = data?.map((dataItem) => dataItem.prefecture)
  return (
    <div>
      <h1>ゆめみ コーディングテスト</h1>
      {isLoading && <p>loading...</p>}
      <CheckBoxes
        prefectures={prefectures ?? []}
        checkedPrefCodes={checkedPrefCodes}
        toggleCheckedPrefCodes={toggleCheckedPrefCodes}
      />
      <DataTypeSelector />
      <Chart />
    </div>
  )
}
export default ChartPage
