export type PopulationPerYear = {
  year: number
  value: number
  rate?: number
}

export type PopulationPerCategory = {
  label: string
  data: PopulationPerYear[]
}

export type ResponseResult = {
  boundaryYear: number
  data: PopulationPerCategory[]
}

export type PopulationApiResponse = {
  message: null | string
  result: ResponseResult
}

export type Prefecture = {
  prefCode: number
  prefName: string
}

export type PrefectureApiResponse = {
  message: null | string
  result: Prefecture[]
}
