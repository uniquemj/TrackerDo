import {type Request, type Response, Router} from "express";
import { Logger } from '../config/logger.config.js';
import type winston from 'winston';
import { handleSuccessResponse } from "../helper/successResponse.helper.js";

export class HealthController{
    private static instance: HealthController;
    readonly router: Router;
    private readonly logger: winston.Logger;

    private constructor(logger: Logger){
        this.router = Router();
        this.logger = logger.getLogger();
    }

    static initController(logger: Logger){
        if(!HealthController.instance){
            HealthController.instance = new HealthController(logger);
        }
        const instance = HealthController.instance;

        instance.router.get('/', instance.getHealthCheck);
        return instance;
    }

    getHealthCheck(req: Request, res: Response){
        handleSuccessResponse(res, true,"OK", "API Running Fine.")
    }
}