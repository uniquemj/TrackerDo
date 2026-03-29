export interface WorkTime{
    wt_id: string,
    user_id: string,
    day: number,
    startTime: string,
    endTime: string,
    createdAt: string
}

export interface WorkTimeParams extends Omit<WorkTime, 'wt_id' | 'user_id' | 'createdAt'>{}

export interface UpdateWorkTimeParams extends Partial<WorkTimeParams>{}