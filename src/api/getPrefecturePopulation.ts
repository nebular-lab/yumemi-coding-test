import { useQuery } from '@tanstack/react-query'
import { axios } from '../lib/axios'
import { PopulationDataSchema, PrefectureArraySchema } from '../types'

const fetchPrefectures = async () => {
  const { data } = await axios.get('/prefectures')
  return PrefectureArraySchema.parse(data.result)
}

const fetchPopulationDataForPrefecture = async (prefCode: number) => {
  const { data } = await axios.get('/population/composition/perYear', {
    params: {
      prefCode,
      cityCode: '-',
    },
  })
  return PopulationDataSchema.parse(data.result.data)
}

export const useQueryPrefecturePopulation = () => {
  const fetchPrefecturePopulation = async () => {
    const prefectures = await fetchPrefectures()

    const populationData = await Promise.all(
      prefectures.map(({ prefCode }) =>
        fetchPopulationDataForPrefecture(prefCode),
      ),
    )

    // Assuming populationData[0] exists
    const firstDataSet = populationData[0]

    const populationTypeLabels = firstDataSet.map(({ label }) => label)

    return { prefectures, populationTypeLabels, populationData }
  }

  return useQuery({
    queryKey: ['prefecturePopulation'],
    queryFn: fetchPrefecturePopulation,
    staleTime: Infinity,
    suspense: true,
  })
}
