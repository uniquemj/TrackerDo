import { inject, injectable } from "tsyringe";
import type { PrismaService } from "../config/prismaService.config.js";
import type { JWTUserPayload, LoginUserParams, UserParams, UserProfileData} from "../types/model/user.types.js";
import { UserRepository } from "../repository/user.repository.js";
import { comparePassword, hashPassword, JWTSign } from "../utils/helper.utils.js";

@injectable()
export class AuthUserService{
    constructor(@inject(UserRepository) private readonly userRespository: UserRepository){}
    
    async createUser(userParams: UserParams):Promise<string>{
        try{
            const userExist = await this.userRespository.findOneByEmail(userParams.email);
            if(userExist){
                throw new Error('User with Email Exists')
            }
            const passwordHash = await hashPassword(userParams.password)
            const user = await this.userRespository.create({...userParams, password: passwordHash})
            const jwtPayload: JWTUserPayload = {
                user_id: user.user_id,
                email: user.email
            }
            const token = JWTSign(jwtPayload)
            return token
        }catch(e:unknown){
            throw new Error(e);
        }
    }

    async loginUser(loginParams: LoginUserParams):Promise<string>{
        try{
            const userExist = await this.userRespository.findOneByEmail(loginParams.email);
            if(!userExist){
                throw new Error("User with Email doesn't exist.")
            }
            const matchPassword = comparePassword(loginParams.password, userExist.password as string);
            if(!matchPassword){
                throw new Error("Password Incorrect")
            }
            const JWTPaylod: JWTUserPayload = {
                user_id: userExist.user_id,
                email: userExist.email
            }
            const token = JWTSign(JWTPaylod);

            return token

        }catch(e: unknown){
            throw new Error(e);
        }
    }

    async getMe(userParams: JWTUserPayload):Promise<UserProfileData>{
        try{
            const userProfile = await this.userRespository.findById(userParams.user_id)
            if(!userProfile){
                throw new Error("User doesn't exist.")
            }
            return {
                email: userProfile.email,
                full_name: userProfile.fname+' '+userProfile.lname,
                fname: userProfile.fname as string,
                lname: userProfile.lname as string,
                is_verified: userProfile.is_verified as boolean
            }
        }catch(e: unknown){
            throw new Error(e);
        }
    }
}