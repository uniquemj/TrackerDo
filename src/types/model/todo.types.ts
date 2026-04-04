import {z} from 'zod';

export enum Status{
    TODO= "todo",
    INPROGRESS="inprogress",
    DONE="done"
}

export const TodoSchema = z.object({
    title: z.string().trim(),
    description: z.string().optional(),
    category_id: z.string().trim(),
    status: z.enum(Status).default(Status.TODO),
    start_time: z.date(),
    end_time: z.date()
})

export const UpdateTodoSchema = TodoSchema.partial();

export interface TodoPayload{
    task_id: string,
    title: string,
    description: string,
    category_id: string,
    status: Status,
    start_time: Date,
    end_time: Date,
    created_at: Date,
    updated_at: Date,
    user_id: string
}


export type TodoParams = z.infer<typeof TodoSchema>;

export type UpdateTodoParams = z.infer<typeof UpdateTodoSchema>;