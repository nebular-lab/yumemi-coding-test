import { useQuery } from '@tanstack/react-query'
import { axios } from '../lib/axios'
import {
  PopulationDataApiResponse,
  PrefectureApiResponse,
  PrefecturePopulation,
} from '../types'

export const useQueryPrefecturePopulation = () => {
  const fetchPrefecturePopulation = async () => {
    const { data: PrefectureResponseData } =
      await axios.get<PrefectureApiResponse>('/prefectures')
    const prefectures = PrefectureResponseData.result
    const prefecturePopulations: PrefecturePopulation[] = await Promise.all(
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
        return {
          prefecture: prefecture,
          labeledPopulations: populationResponseData.result.data,
        }
      }),
    )
    // ラベルを取得したい.
    // 1番目以降は同じラベルが入っているので、0番目のデータから取得する
    const labels = prefecturePopulations[0].labeledPopulations.map(
      (LabeledPopulation) => {
        return LabeledPopulation.label
      },
    )
    return { prefecturePopulations, labels }
  }
  return useQuery({
    queryKey: ['prefecturePopulation'],
    queryFn: fetchPrefecturePopulation,

    staleTime: Infinity,
    suspense: true,
  })
}
