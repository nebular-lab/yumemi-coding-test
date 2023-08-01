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
import { PopulationPerCategory, Prefecture } from '../../type'
import { FC } from 'react'
import { getRondomRGB } from './getRondomRGB'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
}

type Props = {
  checkedPrefectureDatas:
    | {
        prefecture: Prefecture
        populationPerLabels: PopulationPerCategory[]
      }[]
    | undefined
}
const PopulationChart: FC<Props> = (props) => {
  const { checkedPrefectureDatas } = props

  const labels = checkedPrefectureDatas?.[0]?.populationPerLabels[0].data.map(
    (dataItem) => dataItem.year,
  )
  const datasets = checkedPrefectureDatas?.map((checkedPrefectureData) => {
    const prefecture = checkedPrefectureData.prefecture
    const populationPerLabels = checkedPrefectureData.populationPerLabels
    const data = populationPerLabels[0].data.map((dataItem) => dataItem.value)
    const borderColor = getRondomRGB(prefecture.prefCode)
    return {
      label: prefecture.prefName,
      data: data,
      borderColor: borderColor,
    }
  })
  if (!labels || !datasets) {
    return <p>都道府県を選択してください</p>
  }
  const data = {
    labels: labels,
    datasets: datasets,
  }

  return <Line data={data} options={options} />
}
export default PopulationChart
