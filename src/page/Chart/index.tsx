import axios from 'axios';
import Chart from '../../features/Chart';
import CheckBoxes from '../../features/CheckBoxes';
import DataTypeSelector from '../../features/DataTypeSelector';
import { useQuery } from '@tanstack/react-query';

const ChartPage = () => {
  const { data } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts/1'
      );
      return data;
    },
  });
  console.log(data);
  return (
    <div>
      <h1>ゆめみ コーディングテスト</h1>
      <CheckBoxes />
      <DataTypeSelector />
      <Chart />
    </div>
  );
};
export default ChartPage;
