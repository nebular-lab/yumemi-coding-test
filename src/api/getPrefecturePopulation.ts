import { useQuery } from '@tanstack/react-query'
import { axios } from '../lib/axios'
import { PopulationDataSchema, PrefectureArraySchema } from '../types'

const fetchPopulationDataForPrefecture = async (prefCode: number) => {
  const { data: populationResponseData } = await axios.get(
    '/population/composition/perYear',
    {
      params: {
        prefCode,
        cityCode: '-',
      },
    },
  )
  return PopulationDataSchema.parse(populationResponseData.result.data)
}

const fetchPrefectures = async () => {
  const { data: prefectureResponseData } = await axios.get('/prefectures')
  return PrefectureArraySchema.parse(prefectureResponseData.result)
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
    const years = firstDataSet[0].data.map(({ year }) => year)

    return { prefectures, populationTypeLabels, years, populationData }
  }

  return useQuery({
    queryKey: ['prefecturePopulation'],
    queryFn: fetchPrefecturePopulation,
    staleTime: Infinity,
    suspense: true,
  })
}
