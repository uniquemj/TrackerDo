import {z} from 'zod';

export const CategorySchema = z.object({
    title: z.string().min(3, 'At least 3 character requried.').trim(),
    description: z.string().optional()
})

export const PartialCategorySchema = CategorySchema.partial()

export interface CategoryPayload{
    category_id: string,
    title: string,
    description: string
}

export type CategoryParams = z.infer<typeof CategorySchema>;
export type PartialCategoryParams = z.infer<typeof PartialCategorySchema>;
