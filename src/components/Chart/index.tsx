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
import { generateRGBFromSeed } from '../../utils/generateRGBFromSeed'
import { PopulationData, Prefecture } from '../../types'

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
  populations: PopulationData[]
  years: number[]
  prefectures: Prefecture[]
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

  const data = {
    labels: years,
    datasets: checkedPrefCodes.map((checkedPrefCode) => {
      const checkedPrefectureName = prefectures[checkedPrefCode].prefName
      const data = populations[checkedPrefCode][selectedLabelIndex].data.map(
        (population) => population.value,
      )
      const borderColor = generateRGBFromSeed(checkedPrefCode)
      return {
        label: checkedPrefectureName,
        data: data,
        borderColor: borderColor,
      }
    }),
  }
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
