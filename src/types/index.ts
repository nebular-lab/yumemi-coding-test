import { z } from 'zod'

const PrefectureSchema = z.object({
  prefCode: z.number(),
  prefName: z.string(),
})
export const PrefectureArraySchema = z.array(PrefectureSchema)
export type Prefecture = z.infer<typeof PrefectureSchema>

export const PopulationDataSchema = z.array(
  z.object({
    label: z.string(),
    data: z.array(
      z.object({
        year: z.number(),
        value: z.number(),
        rate: z.number().optional(),
      }),
    ),
  }),
)
export type PopulationData = z.infer<typeof PopulationDataSchema>