import z from 'zod';

export const UserSchema = z.object({
    fname: z.string().min(3).trim(),
    lname: z.string().min(3).trim(),
    email: z.email().trim(),
    password: z.string().min(8, 'At least 8 words required.').trim(),
    is_verified: z.boolean().default(false).optional(),
    role: z.string().optional()
})

export interface UserPayload{
    user_id: string,
    fname: string,
    lname: string,
    email: string,
    password: string,
    is_verified?: boolean,
    role: string
}

export const LoginUserSchema = UserSchema.pick(
    {
        email: true,
        password: true
    }
)

export const UpdateUserSchema = UserSchema.partial(
    {
        email: true,
        fname: true,
        lname: true,
        password: true,
        is_verified: true
    }
)
export enum ROLE{
    ADMIN='ADMIN',
    USER='USER'
}

export type UserParams = z.infer<typeof UserSchema>;

export type UpdateUserParams = z.infer<typeof UpdateUserSchema>

export interface JWTUserPayload extends Pick<UserPayload, 'user_id'|'email'|'role'>{}

export type LoginUserParams = z.infer<typeof LoginUserSchema>

export interface UserProfileData extends Omit<UserPayload, 'user_id' | 'password'>{
    full_name: string
}