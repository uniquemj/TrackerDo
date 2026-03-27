export enum ROLE{
    ADMIN='ADMIN',
    USER='USER'
}

export interface UserPayload{
    user_id: string,
    fname: string,
    lname: string,
    email: string,
    password: string,
    is_verified?: boolean,
    role: string
}

export interface UserParams extends Omit<UserPayload, 'user_id'>{}

export interface UpdateUserParams extends Partial<UserParams>{}

export interface JWTUserPayload extends Pick<UserPayload, 'user_id'|'email'|'role'>{}

export interface LoginUserParams extends Omit<UserPayload, 'user_id' | 'fname' | 'lname' | 'is_verified'>{}

export interface UserProfileData extends Omit<UserPayload, 'user_id' | 'password'>{
    full_name: string
}