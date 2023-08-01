import { useState } from 'react'
import Chart from '../../features/Chart'
import CheckBoxes from '../../features/CheckBoxes'
import DataTypeSelector from '../../features/DataTypeSelector'
import { useQueryPrefecturePopulation } from './api/getPrefecture'
import { useCheckedPrefCodes } from './hooks/useCheckedPrefCodes'

const ChartPage = () => {
  const { data, isLoading, error } = useQueryPrefecturePopulation()
  const { checkedPrefCodes, toggleCheckedPrefCodes } = useCheckedPrefCodes()
  return (
    <div>
      <h1>ゆめみ コーディングテスト</h1>
      {isLoading && <p>loading...</p>}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {data &&
          data.map((item) => (
            <div>
              <input
                type='checkbox'
                checked={checkedPrefCodes.includes(item.prefecture.prefCode)}
                onChange={() =>
                  toggleCheckedPrefCodes(item.prefecture.prefCode)
                }
              />
              <label>{item.prefecture.prefName}</label>
            </div>
          ))}
      </div>
      <CheckBoxes />
      <DataTypeSelector />
      <Chart />
    </div>
  )
}
export default ChartPage
