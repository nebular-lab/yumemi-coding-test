export const generateGraphData = (
  checkedPrefCodes: number[],
  selectedLabelIndex: number,
  years: number[],
  populations: number[][][],
  prefectures: string[],
) => {
  return {
    labels: years,
    datasets: generateDatasets(
      checkedPrefCodes,
      selectedLabelIndex,
      populations,
      prefectures,
    ),
  }
}

const generateDatasets = (
  checkedPrefCodes: number[],
  selectedLabelIndex: number,
  populations: number[][][],
  prefectures: string[],
) => {
  return checkedPrefCodes.map((checkedPrefCode) => {
    const checkedPrefecture = prefectures[checkedPrefCode - 1]
    const data = populations[checkedPrefCode - 1][selectedLabelIndex]
    const borderColor = generateRGBFromSeed(checkedPrefCode)
    return {
      label: checkedPrefecture,
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
