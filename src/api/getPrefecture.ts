import { useQuery } from '@tanstack/react-query'
import { axios } from '../lib/axios'
import { PopulationDataApiResponse, PrefectureApiResponse } from '../types'

export const useQueryPrefecturePopulation = () => {
  const fetchPrefecturePopulation = async () => {
    const { data: PrefectureResponseData } =
      await axios.get<PrefectureApiResponse>('/prefectures')
    if (!PrefectureResponseData.result) {
      throw new Error('Failed to fetch prefecture data')
    }
    const prefectures = PrefectureResponseData.result
    const populations = await Promise.all(
      prefectures.map(async (prefecture) => {
        const { data: populationResponseData } =
          await axios.get<PopulationDataApiResponse>(
            '/population/composition/perYear',
            {
              params: {
                prefCode: prefecture.prefCode,
                cityCode: '-',
              },
            },
          )
        if (!populationResponseData) {
          throw new Error('Failed to fetch population data')
        }
        return {
          prefecture,
          populationPerLabels: populationResponseData.result.data,
        }
      }),
    )
    const labels = populations[0].populationPerLabels.map(
      (populationPerLabel) => {
        return populationPerLabel.label
      },
    )
    return { populations, labels }
  }
  return useQuery({
    queryKey: ['prefecturePopulation'],
    queryFn: fetchPrefecturePopulation,

    staleTime: Infinity,
    suspense: true,
  })
}
