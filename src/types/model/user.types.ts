export interface UserPayload{
    user_id: string,
    fname: string,
    lname: string,
    email: string,
    password: string,
    is_verified?: boolean
}

export interface UserParams extends Omit<UserPayload, 'user_id'>{}

export interface UpdateUserParams extends Partial<UserParams>{}

export interface JWTUserPayload extends Pick<UserPayload, 'user_id'|'email'>{}
