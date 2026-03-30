import { injectable } from "tsyringe";
import type { PrismaService } from "../config/prismaService.config.js";
import type { UpdateWorkTimeParams, WorkTimeParams } from "../types/model/worktime.types.js";

@injectable()
export class WorkTimeRepository{
    constructor(private readonly prismaService: PrismaService){}

    getByUserId = async(user_id: string) =>{
        const result = await this.prismaService.workTime.findFirst({where: {user_id: user_id}});
        return result;
    }
    
    get = async(wt_id: string, user_id: string) =>{
        const result = await this.prismaService.workTime.findUnique({where: {wt_id_user_id: {wt_id: wt_id, user_id: user_id}}});
        return result;
    }

    create = async(user_id: string, dataLoad: WorkTimeParams) =>{
        const result = await this.prismaService.workTime.create({
            data: {
                ...dataLoad,
                auth_user: {connect: {user_id: user_id}},
            }
        });
        return result;
    }

    update = async(wt_id: string, user_id: string, dataLoad: UpdateWorkTimeParams) =>{
        const result = await this.prismaService.workTime.update({
            where: {wt_id_user_id: {
                wt_id: wt_id,
                user_id: user_id
            }},
            data: {
                ...dataLoad
            }
        });
        return result;
    }

    delete = async(wt_id: string, user_id: string) =>{
        const result = await this.prismaService.workTime.delete({
            where: {
                wt_id_user_id: {
                    wt_id: wt_id,
                    user_id: user_id
                }
            }
        });
        return result;
    }
}