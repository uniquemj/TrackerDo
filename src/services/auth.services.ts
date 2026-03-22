import { inject, injectable } from "tsyringe";
import type { PrismaService } from "../config/prismaService.config.js";
import type { JWTUserPayload, UserParams } from "../types/model/user.types.js";
import { UserRepository } from "../repository/user.repository.js";
import { hashPassword, JWTSign } from "../utils/helper.utils.js";

@injectable()
export class AuthUserService{
    constructor(@inject(UserRepository) private readonly userRespository: UserRepository){}
    
    async createUser(userParams: UserParams){
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
}