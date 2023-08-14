import { useQuery } from '@tanstack/react-query'
import { axios } from '../lib/axios'

export const useQueryPrefecturePopulation = () => {
  const fetchPrefecturePopulation = async () => {
    const { data: PrefectureResponseData } =
      await axios.get<PrefectureApiResponse>('/prefectures')
    const prefectures = PrefectureResponseData.result.map(
      (prefecture) => prefecture.prefName,
    )
    const populationData = await Promise.all(
      prefectures.map(async (_, index) => {
        const { data: populationResponseData } =
          await axios.get<PopulationDataApiResponse>(
            '/population/composition/perYear',
            {
              params: {
                prefCode: index + 1, // 都道府県コードはindex+1と同じ
                cityCode: '-',
              },
            },
          )
        return populationResponseData.result.data
      }),
    )

    // 都道府県ごとの人口 [都道府県コード-1][ラベル][年]
    // 都道府県コードは1から始まるので、配列のindexとは1ずれることに注意
    // 例 populations[0][0][0] => 北海道の総人口の1980年の人口
    // 例 populations[0][0][1] => 北海道の総人口の1985年の人口
    // 例 populations[0][1][0] => 北海道の生産年齢人口の1980年の人口
    // 例 populations[1][0][0] => 青森県の総人口の1980年の人口
    const populations = populationData.map((prefecturePopulation) => {
      return prefecturePopulation.map((LabeledPopulation) => {
        return LabeledPopulation.data.map((population) => {
          return population.value
        })
      })
    })
    // 人口タイプのラベル ['総人口', '年少人口', '生産年齢人口', '老年人口']
    const populationTypeLabels = populationData[0].map((LabeledPopulation) => {
      return LabeledPopulation.label
    })
    // 年 [1980, 1985, 1990, ...]
    const years = populationData[0][0].data.map((population) => {
      return population.year
    })

    return { prefectures, populations, populationTypeLabels, years }
  }
  return useQuery({
    queryKey: ['prefecturePopulation'],
    queryFn: fetchPrefecturePopulation,
    staleTime: Infinity,
    suspense: true,
  })
}
type PopulationDataApiResponse = {
  message: null | string
  result: {
    boundaryYear: number
    data: {
      label: string
      data: {
        year: number
        value: number
        rate?: number
      }[]
    }[]
  }
}

type PrefectureApiResponse = {
  message: null | string
  result: {
    prefCode: number
    prefName: string
  }[]
}
