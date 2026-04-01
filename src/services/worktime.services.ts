import { inject, injectable } from "tsyringe";
import type { UpdateWorkTimeParams, WorkTimeParams } from "../types/model/worktime.types.js";
import { WorkTimeRepository } from "../repository/worktime.repository.js";
import createHttpError from "../config/errorHandler.config.js";

@injectable()
export class WorkTimeService{
    constructor(@inject(WorkTimeRepository) private readonly workTimeRepository: WorkTimeRepository){}

    createWorkTime = async(user_id: string, dataLoad: WorkTimeParams) =>{
        try{
           const workTime = await this.workTimeRepository.createWorkTime(user_id, dataLoad);
           return workTime;
        } catch(e){
            throw createHttpError.InternalServerError('Internal Error:',e)
        }
    }

    getWorkTimeByUser = async(user_id: string) =>{
        try{
            const userDataExist = await this.workTimeRepository.getByUserId(user_id);
            return userDataExist;
        } catch(e){
            throw createHttpError.InternalServerError('Internal Error:',e)
        }
    }

    getWorkTime = async(wt: string, user_id: string) =>{
        try{
            const workTimeExist = await this.workTimeRepository.get(wt, user_id);
            if(!workTimeExist){
                throw createHttpError.NotFound("Work Time doesn't exist.")
            }
            return workTimeExist;
        }catch(e){
            throw createHttpError.InternalServerError('Internal Error:',e)
        }
    }

    updateWorkTime = async(wt_id: string, user_id: string, dataLoad: UpdateWorkTimeParams) =>{
        try{
            await this.getWorkTime(wt_id, user_id);
            const result = await this.workTimeRepository.updateWorkTime(wt_id, user_id, dataLoad);
            return result
        } catch(e){
            throw createHttpError.InternalServerError('Internal Error:',e)
        }
    }


    deleteWorkTime = async(wt_id: string, user_id: string) =>{
        try{
            await this.getWorkTime(wt_id, user_id);
            const result = await this.workTimeRepository.deleteWorkTime(wt_id, user_id);
            return result;
        } catch(e){
            throw createHttpError.InternalServerError('Internal Error:',e)
        }
    }
}