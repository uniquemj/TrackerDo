export interface searchParams{
    user_id: string,
    title?: string,
    status?: string
}

export interface PaginationData{
    limit?: number,
    page?: number
}