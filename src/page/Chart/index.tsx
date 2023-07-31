import { useState } from 'react';
import Chart from '../../features/Chart';
import CheckBoxes from '../../features/CheckBoxes';
import DataTypeSelector from '../../features/DataTypeSelector';
import { useQueryPrefecturePopulation } from './api/getPrefecture';

const ChartPage = () => {
  const { data, isLoading,error } = useQueryPrefecturePopulation();
  const [num, setNum] = useState(0);
  return (
    <div>
      <button onClick={() => setNum(num + 1)}>+1</button>
      <p>{num}</p>
      <h1>ゆめみ コーディングテスト</h1>
      {isLoading && <p>loading...</p>}
      {data&&data.map((item)=>(
        <div key={item.prefecture.prefCode}>{item.prefecture.prefName}</div>
      ))}
      <CheckBoxes />
      <DataTypeSelector />
      <Chart />
    </div>
  );
};
export default ChartPage;
