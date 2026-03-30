import { inject, injectable } from "tsyringe";
import type { UpdateWorkTimeParams, WorkTimeParams } from "../types/model/worktime.types.js";
import { WorkTimeRepository } from "../repository/worktime.repository.js";

@injectable()
export class WorkTimeService{
    constructor(@inject(WorkTimeRepository) private readonly workTimeRepository: WorkTimeRepository){}

    createWorkTime = async(user_id: string, dataLoad: WorkTimeParams) =>{
        try{
           
        } catch(e){
            throw new Error('Internal Error:',e)
        }
    }

    getWorkTimeByUser = async(user_id: string) =>{
        try{
            const userDataExist = await this.workTimeRepository.getByUserId(user_id);
            return userDataExist;
        } catch(e){
            throw new Error('Internal Error:',e)
        }
    }

    getWorkTime = async(wt: string, user_id: string) =>{
        try{
            const workTimeExist = await this.workTimeRepository.get(wt, user_id);
            if(!workTimeExist){
                throw new Error("Work Time doesn't exist.")
            }
            return workTimeExist;
        }catch(e){
            throw new Error('Internal Error', e);
        }
    }

    updateWorkTime = async(wt_id: string, user_id: string, dataLoad: UpdateWorkTimeParams) =>{
        try{
            this.getWorkTime(wt_id, user_id);
            const result = await this.workTimeRepository.update(wt_id, user_id, dataLoad);
            return result
        } catch(e){
            throw new Error('Internal Error:',e)
        }
    }


    deleteWorkTime = async(wt_id: string, user_id: string) =>{
        try{
            this.getWorkTime(wt_id, user_id);
            const result = await this.workTimeRepository.delete(wt_id, user_id);
            return result;
        } catch(e){
            throw new Error('Internal Error:',e)
        }
    }
}