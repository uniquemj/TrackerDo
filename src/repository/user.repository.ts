import { inject, injectable } from "tsyringe";
import type { UpdateUserParams, UserParams, UserPayload } from "../types/model/user.types.js";
import type { PrismaService } from "../config/prismaService.config.js";

@injectable()
export class UserRepository { 
    constructor(@inject('PrismaService') private readonly prismaService: PrismaService){}
    async findAll(){
        const users = await this.prismaService.auth_user.findMany();
        return users;
    }

    async findOneByEmail(email: string){
        const users = await this.prismaService.auth_user.findUnique({where: {email: email}});
        return users;
    }

    async findById(user_id: string){
        const users = await this.prismaService.auth_user.findUnique({where: {user_id: user_id}});
        return users;
    }

    async create (userParams: UserParams){
        const user = await this.prismaService.auth_user.create({
            data: {
                    fname: userParams.fname,
                    lname: userParams.lname,
                    email: userParams.email,
                    password: userParams.password,
                    is_verified: userParams.is_verified ?? false
                }
            })

        return user
    }

    async update(user_id: string, updateUserParams: UpdateUserParams){
        const user = await this.prismaService.auth_user.update({
            where: { user_id: user_id},
            data: {...updateUserParams},
        });
    }
}