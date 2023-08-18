import { useQuery } from '@tanstack/react-query'
import { axios } from '../lib/axios'
import { PopulationDataSchema, PrefectureArraySchema } from '../types'

export const useQueryPrefecturePopulation = () => {
  const fetchPrefecturePopulation = async () => {
    const { data: prefectureResponseData } = await axios.get('/prefectures')
    const prefectures = PrefectureArraySchema.parse(
      prefectureResponseData.result,
    )

    const populationData = await Promise.all(
      prefectures.map(async (prefecture) => {
        const { data: populationResponseData } = await axios.get(
          '/population/composition/perYear',
          {
            params: {
              prefCode: prefecture.prefCode,
              cityCode: '-',
            },
          },
        )
        return PopulationDataSchema.parse(populationResponseData.result.data)
      }),
    )

    // 人口タイプのラベル ['総人口', '年少人口', '生産年齢人口', '老年人口']
    const populationTypeLabels = populationData[0].map((LabeledPopulation) => {
      return LabeledPopulation.label
    })
    // 年 [1980, 1985, 1990, ...]
    const years = populationData[0][0].data.map((population) => {
      return population.year
    })

    return { prefectures, populationTypeLabels, years, populationData }
  }
  return useQuery({
    queryKey: ['prefecturePopulation'],
    queryFn: fetchPrefecturePopulation,
    staleTime: Infinity,
    suspense: true,
  })
}
