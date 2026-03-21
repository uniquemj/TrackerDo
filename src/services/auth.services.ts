import { inject, injectable } from "tsyringe";
import type { PrismaService } from "../config/prismaService.config.js";
import type { UserData } from "../types/model/user.types.js";

@injectable()
export class AuthUserService{
    constructor(@inject('PrismaService') private readonly prismaService: PrismaService){}
    
    async createUser(userData: UserData){
        try{
            const user = await this.prismaService.auth_user.create({
                data: {
                    fname: userData.fname,
                    lname: userData.lname,
                    email: userData.email,
                    password: userData.password,
                    is_verified: userData.is_verified ?? false
                }
            })

            return user
        }catch(e:unknown){
            throw new Error(e);
        }
    }
}