import { PrefecturePopulation } from '../../../types'

export const generateGraphData = (
  checkedPrefectures: PrefecturePopulation[],
  selectedLabelIndex: number,
) => {
  return {
    labels: generateLabels(checkedPrefectures),
    datasets: generateDatasets(checkedPrefectures, selectedLabelIndex),
  }
}

const generateLabels = (checkedPrefectures: PrefecturePopulation[]) => {
  return checkedPrefectures[0].labeledPopulations[0].data.map(
    (dataItem) => dataItem.year,
  )
}

const generateDatasets = (
  checkedPrefectures: PrefecturePopulation[],
  selectedLabelIndex: number,
) => {
  return checkedPrefectures.map((checkedPrefectureData) => {
    const prefecture = checkedPrefectureData.prefecture
    const populationPerLabels = checkedPrefectureData.labeledPopulations
    const data = populationPerLabels[selectedLabelIndex].data.map(
      (dataItem) => dataItem.value,
    )
    const borderColor = generateRGBFromSeed(prefecture.prefCode)
    return {
      label: prefecture.prefName, // このラベルはChartの凡例のラベルである都道府県名を表す
      data: data,
      borderColor: borderColor,
    }
  })
}

const generateRGBFromSeed = (seed: number) => {
  const r = Math.floor(Math.sin(seed) * 256)
  const g = Math.floor(Math.sin(seed * seed) * 256)
  const b = Math.floor(Math.sin(seed * seed * seed) * 256)
  return `rgb(${r},${g},${b})`
}
