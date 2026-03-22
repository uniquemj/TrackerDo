export interface UserParams{
    fname: string,
    lname: string,
    email: string,
    password: string,
    is_verified?: boolean
}

export interface UpdateUserParams extends Partial<UserParams>{
}