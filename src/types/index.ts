export type AnnualPopulationData = {
  year: number
  value: number
  rate?: number
}

export type LabeledPopulation = {
  label: string
  data: AnnualPopulationData[]
}

export type PopulationDataApiResponse = {
  message: null | string
  result: {
    boundaryYear: number
    data: LabeledPopulation[]
  }
}

export type PrefecturePopulation = {
  prefecture: Prefecture
  labeledPopulations: LabeledPopulation[]
}

export type Prefecture = {
  prefCode: number
  prefName: string
}

export type PrefectureApiResponse = {
  message: null | string
  result: Prefecture[]
}
