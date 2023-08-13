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
import { LabeledPopulationData, Prefecture } from '../types'
import { FC } from 'react'
import { generateRGBFromSeed } from '../lib/generateRGBFromSeed'

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
    populationPerLabels: LabeledPopulationData[]
  }[]
  labels: string[]
  selectedLabelIndex: number
}
const PopulationChart: FC<Props> = (props) => {
  const { checkedPrefectures, labels, selectedLabelIndex } = props

  //Chartのx軸のラベルである年度を表す labels=[1980,1985,1990...]
  const xAxisLabels = checkedPrefectures?.[0]?.populationPerLabels[0].data.map(
    (dataItem) => dataItem.year,
  )
  const datasets = checkedPrefectures?.map((checkedPrefectureData) => {
    const prefecture = checkedPrefectureData.prefecture
    const populationPerLabels = checkedPrefectureData.populationPerLabels
    const data = populationPerLabels[selectedLabelIndex].data.map(
      (dataItem) => dataItem.value,
    )
    const borderColor = generateRGBFromSeed(prefecture.prefCode)
    return {
      label: prefecture.prefName, //このラベルはChartの凡例のラベルである都道府県名を表す
      data: data,
      borderColor: borderColor,
    }
  })
  if (!xAxisLabels || !datasets) {
    return <p>都道府県を選択してください</p>
  }

  const data = {
    labels: xAxisLabels,
    datasets: datasets,
  }
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