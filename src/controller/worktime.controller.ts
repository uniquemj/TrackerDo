import { Router, type Response } from "express";
import type { Logger } from "../config/logger.config.js";
import type winston from "winston";
import type { WorkTimeService } from "../services/worktime.services.js";
import type { AuthRequest } from "../types/utils/user.types.js";
import { handleSuccessResponse } from "../helper/successResponse.helper.js";
import { AuthMiddleware } from "../middlewares/auth.middlewares.js";
import { validate } from "../middlewares/validate.middlewares.js";
import { UpdateWorkTimeSchema, WorkTimeSchema } from "../types/model/worktime.types.js";

export class WorkTimeController{
    private static instance: WorkTimeController;
    readonly router: Router;
    private readonly logger: winston.Logger;

    private constructor(logger: Logger, private readonly workTimeServices: WorkTimeService){
        this.router = Router();
        this.logger = logger.getLogger();
    }

    static initController(logger: Logger, workTimeServices: WorkTimeService){
        if(!WorkTimeController.instance){
            WorkTimeController.instance = new WorkTimeController(logger, workTimeServices);
        }
        const instance = WorkTimeController.instance;

        instance.router.get('', AuthMiddleware, instance.getWorkTimeByUser);
        instance.router.post('', AuthMiddleware, validate(WorkTimeSchema), instance.createWorkTime);
        instance.router.put('/:id', AuthMiddleware, validate(UpdateWorkTimeSchema), instance.updateWorkTime);
        instance.router.delete('/:id', AuthMiddleware, instance.deleteWorkTime);
        
        return instance;
    }

    createWorkTime = async(req: AuthRequest, res: Response) =>{
        this.logger.debug('Initializing Creation of WorkTime');
        const {user_id} = req.user!;
        const dataLoad = req.body;

        const result = await this.workTimeServices.createWorkTime(user_id, dataLoad);
        this.logger.debug('WorkTime Created.');

        this.logger.info('WorkTime Created.');
        handleSuccessResponse(res, true, 'WorkTime Created.', result);
    }

    updateWorkTime = async(req: AuthRequest, res: Response) =>{
        this.logger.debug('Initializing Update of WorkTime');
        const {user_id} = req.user!;
        const updateData = req.body;
        const id = req.params.id as string;

        const result = await this.workTimeServices.updateWorkTime(id, user_id, updateData);
        this.logger.debug('WorkTime Updated.');

        this.logger.info('WorkTime Updated.');
        handleSuccessResponse(res, true, 'WorkTime Updated.', result);
    }

    getWorkTimeByUser = async(req: AuthRequest, res: Response) =>{
        this.logger.debug('Fetching WorkTime of User');
        const {user_id} = req.user!;

        const result = await this.workTimeServices.getWorkTimeByUser(user_id);
        this.logger.debug('WorkTime Fetched.');

        this.logger.info('WorkTime Fetched.');
        handleSuccessResponse(res, true, 'WorkTime Fetched.', result);
    }

    deleteWorkTime = async(req: AuthRequest, res: Response) =>{
        this.logger.debug('Deleting WorkTime of User');
        const {user_id} = req.user!;
        const id = req.params.id as string;
        const result = await this.workTimeServices.deleteWorkTime(id, user_id);
        this.logger.debug('WorkTime Deleted.');

        this.logger.info('WorkTime Deleted.');
        handleSuccessResponse(res, true, 'WorkTime Deleted.', result);
    }
}