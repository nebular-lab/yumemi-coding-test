import { useQuery } from '@tanstack/react-query';
import { axios } from '../../../lib/axios';
import { PopulationApiResponse, PrefectureApiResponse } from '../../../type';

export const useQueryPrefecturePopulation = () => {
  const fetchPrefecturePopulation = async () => {
    console.log('fetch')
    const {data:PrefectureResponseData}= await axios.get<PrefectureApiResponse>(
      "/prefectures")
    const prefectures = PrefectureResponseData.result;
    const populationData = await Promise.all(
      prefectures.map(async (prefecture) => {
        const { data: populationResponseData } = await axios.get<PopulationApiResponse>(
          '/population/composition/perYear',
          {
            params: {
              prefCode: prefecture.prefCode,
              cityCode: '-',
            },
          }
        );
        return {prefecture,populationPerLabels: populationResponseData.result.data};
      })
    );
    return populationData;
  };
  return useQuery({
    queryKey: ['prefecturePopulation'],
    queryFn: fetchPrefecturePopulation,
    staleTime: Infinity,
  });
};
