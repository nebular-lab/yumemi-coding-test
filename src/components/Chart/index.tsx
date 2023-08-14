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
  checkedPrefCodes: number[]
  populationTypeLabels: string[]
  selectedLabelIndex: number
  populations: number[][][]
  years: number[]
  prefectures: string[]
}
const PopulationChart: FC<Props> = (props) => {
  const {
    checkedPrefCodes,
    populationTypeLabels,
    selectedLabelIndex,
    populations,
    years,
    prefectures,
  } = props

  if (checkedPrefCodes.length === 0) return <p>都道府県を選択してください</p>

  const data = generateGraphData(
    checkedPrefCodes,
    selectedLabelIndex,
    years,
    populations,
    prefectures,
  )
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: populationTypeLabels[selectedLabelIndex],
      },
    },
  }

  return <Line data={data} options={options} />
}
export default PopulationChart
