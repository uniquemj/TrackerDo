export interface CategoryPayload{
    category_id: string,
    title: string,
    description: string
}

export interface CategoryParams extends Omit<CategoryPayload, 'category_id'>{}

export interface PartialCategoryParams extends Partial<CategoryParams>{}
