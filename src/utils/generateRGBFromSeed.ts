/**
 * シード番号に基づいてRGB色文字列を生成します。
 * 色の変動を確保するためにsin関数を使用します。
 *
 * @param seed - RGB値を生成するためのベースとして使用される数字。
 * @return RGB色の文字列表現。
 */
export const generateRGBFromSeed = (seed: number) => {
  const r = Math.floor(Math.sin(seed) * 256)
  const g = Math.floor(Math.sin(seed * seed) * 256)
  const b = Math.floor(Math.sin(seed * seed * seed) * 256)
  return `rgb(${r},${g},${b})`
}
