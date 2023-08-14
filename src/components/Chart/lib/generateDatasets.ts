/**
 * グラフの可視化のためのデータ構造を生成します。
 *
 * @param checkedPrefCodes - 選択された都道府県コードの配列。
 * @param selectedLabelIndex - 選択されたラベルのインデックス。
 * @param years - x軸ラベルのための年の配列。
 * @param populations - 人口を表す3D配列。
 *                      1次元目は都道府県、
 *                      2次元目はラベルインデックス、
 *                      3次元目は年。
 * @param prefectures - 都道府県名の配列。
 * @return グラフのためのラベルとデータセットを含むオブジェクト。
 */
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

/**
 * シード番号に基づいてRGB色文字列を生成します。
 * 色の変動を確保するためにsin関数を使用します。
 *
 * @param seed - RGB値を生成するためのベースとして使用される数字。
 * @return RGB色の文字列表現。
 */
const generateRGBFromSeed = (seed: number) => {
  const r = Math.floor(Math.sin(seed) * 256)
  const g = Math.floor(Math.sin(seed * seed) * 256)
  const b = Math.floor(Math.sin(seed * seed * seed) * 256)
  return `rgb(${r},${g},${b})`
}
