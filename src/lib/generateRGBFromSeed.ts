export const generateRGBFromSeed = (seed: number) => {
  const r = Math.floor(Math.sin(seed) * 256)
  const g = Math.floor(Math.sin(seed * seed) * 256)
  const b = Math.floor(Math.sin(seed * seed * seed) * 256)
  return `rgb(${r},${g},${b})`
}
