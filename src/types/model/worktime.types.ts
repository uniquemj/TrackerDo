import {z} from 'zod';

export interface WorkTime{
    wt_id: string,
    user_id: string,
    day: number,
    startTime: string,
    endTime: string,
    createdAt: string
}

export const WorkTimeSchema = z.object({
    day: z.number().default(1),
    startTime: z.date(),
    endTime: z.date()
})

export const UpdateWorkTimeSchema = WorkTimeSchema.partial();

export type WorkTimeParams = z.infer<typeof WorkTimeSchema>;
export type UpdateWorkTimeParams = z.infer<typeof UpdateWorkTimeSchema>;