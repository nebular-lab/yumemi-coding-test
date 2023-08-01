import { useQuery } from '@tanstack/react-query'
import { axios } from '../../../lib/axios'
import { PopulationApiResponse, PrefectureApiResponse } from '../../../type'

export const useQueryPrefecturePopulation = () => {
  const fetchPrefecturePopulation = async () => {
    const { data: PrefectureResponseData } =
      await axios.get<PrefectureApiResponse>('/prefectures')
    const prefectures = PrefectureResponseData.result
    const population = await Promise.all(
      prefectures.map(async (prefecture) => {
        const { data: populationResponseData } =
          await axios.get<PopulationApiResponse>(
            '/population/composition/perYear',
            {
              params: {
                prefCode: prefecture.prefCode,
                cityCode: '-',
              },
            },
          )
        return {
          prefecture,
          populationPerLabels: populationResponseData.result.data,
        }
      }),
    )
    const labels = population[0].populationPerLabels.map(
      (populationPerLabel) => {
        return populationPerLabel.label
      },
    )
    return { population, labels }
  }
  return useQuery({
    queryKey: ['prefecturePopulation'],
    queryFn: fetchPrefecturePopulation,
    staleTime: Infinity,
  })
}
