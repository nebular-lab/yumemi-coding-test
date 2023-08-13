import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { LabeledPopulation, Prefecture } from '../../types'
import { FC } from 'react'
import { generateGraphData } from './lib/generateDatasets'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

type Props = {
  checkedPrefectures: {
    prefecture: Prefecture
    labeledPopulations: LabeledPopulation[]
  }[]
  labels: string[]
  selectedLabelIndex: number
}
const PopulationChart: FC<Props> = (props) => {
  const { checkedPrefectures, labels, selectedLabelIndex } = props

  if (checkedPrefectures.length === 0) return <p>都道府県を選択してください</p>

  const data = generateGraphData(checkedPrefectures, selectedLabelIndex)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: labels[selectedLabelIndex],
      },
    },
  }

  return <Line data={data} options={options} />
}
export default PopulationChart
