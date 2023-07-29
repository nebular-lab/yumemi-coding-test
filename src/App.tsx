import Chart from './features/Chart';
import CheckBoxes from './features/CheckBoxes';
import DataTypeSelector from './features/DataTypeSelector';

const App = () => {
  // TODO ここでfetchする
  return (
    <div>
      <h1>ゆめみ コーディングテスト</h1>
      <CheckBoxes />
      <DataTypeSelector />
      <Chart />
    </div>
  );
};

export default App;
