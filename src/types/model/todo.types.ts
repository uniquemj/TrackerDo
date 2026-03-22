export enum Category{

}

export enum Status{
    TODO= "todo",
    INPROGRESS="inprogress",
    DONE="done"
}

export interface TodoPayload{
    task_id: string,
    title: string,
    description: string,
    category: string,
    status: Status,
    start_time: Date,
    end_time: Date,
    created_at: Date,
    updated_at: Date,
    user_id: string
}

export interface TodoParams extends Omit<TodoPayload, 'task_id' | 'created_at' | 'updated_at'>{}

export interface UpdateTodoParams extends Partial<Omit<TodoParams, 'user_id'>>{};