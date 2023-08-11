export type AnnualPopulationData = {
  year: number
  value: number
  rate?: number
}

export type LabeledPopulationData = {
  label: string
  data: AnnualPopulationData[]
}

export type PopulationDataApiResponse = {
  message: null | string
  result: {
    boundaryYear: number
    data: LabeledPopulationData[]
  }
}


export type Prefecture = {
  prefCode: number
  prefName: string
}

export type PrefectureApiResponse = {
  message: null | string
  result: Prefecture[]
}
