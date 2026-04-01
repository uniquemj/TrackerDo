import { inject, injectable } from "tsyringe";
import type { PrismaService } from "../config/prismaService.config.js";
import { ROLE, type JWTUserPayload, type LoginUserParams, type UserParams, type UserProfileData} from "../types/model/user.types.js";
import { UserRepository } from "../repository/user.repository.js";
import { comparePassword, hashPassword, JWTSign } from "../utils/helper.utils.js";
import createHttpError from "../config/errorHandler.config.js";

@injectable()
export class AuthUserService{
    constructor(@inject(UserRepository) private readonly userRespository: UserRepository){}
    
    async createUser(userParams: UserParams):Promise<string>{
        try{
            const userExist = await this.userRespository.findOneByEmail(userParams.email);
            if(userExist){
                throw createHttpError.BadRequest('User with Email Exists')
            }
            const passwordHash = await hashPassword(userParams.password)
            const user = await this.userRespository.create({...userParams, role: userParams.role ?? ROLE.USER, password: passwordHash})
            const jwtPayload: JWTUserPayload = {
                user_id: user.user_id,
                email: user.email,
                role: user.role as string
            }
            const token = JWTSign(jwtPayload)
            return token
        }catch(e:unknown){
            throw createHttpError.InternalServerError('Internal Server Error: ', e);
        }
    }

    async loginUser(loginParams: LoginUserParams):Promise<string>{
        try{
            const userExist = await this.userRespository.findOneByEmail(loginParams.email);
            if(!userExist){
                throw createHttpError.NotFound("User with Email doesn't exist.")
            }
            const matchPassword = comparePassword(loginParams.password, userExist.password as string);
            if(!matchPassword){
                throw createHttpError.BadRequest("Password Incorrect")
            }
            const JWTPaylod: JWTUserPayload = {
                user_id: userExist.user_id,
                email: userExist.email,
                role: userExist.role as string
            }
            const token = JWTSign(JWTPaylod);

            return token

        }catch(e: unknown){
            throw createHttpError.InternalServerError('Internal Server Error: ', e);
        }
    }

    async getMe(userParams: JWTUserPayload):Promise<UserProfileData>{
        try{
            const userProfile = await this.userRespository.findById(userParams.user_id)
            if(!userProfile){
                throw createHttpError.NotFound("User doesn't exist.")
            }
            return {
                email: userProfile.email,
                full_name: userProfile.fname+' '+userProfile.lname,
                fname: userProfile.fname as string,
                lname: userProfile.lname as string,
                is_verified: userProfile.is_verified as boolean,
                role: userProfile.role as string
            }
        }catch(e: unknown){
            throw createHttpError.InternalServerError('Internal Server Error: ', e);
        }
    }
}