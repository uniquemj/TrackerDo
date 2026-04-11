import { Router, type Request, type Response } from "express";
import winston from "winston";
import {Logger} from "../config/logger.config.js";
import createHttpError from "../config/errorHandler.config.js";

export class CatchAllController{
    private static instance: CatchAllController;
    readonly router: Router;
    private readonly logger: winston.Logger;

    private constructor(logger:Logger){
        this.router = Router(),
        this.logger = logger.getLogger();
    }

    static initController(logger: Logger){
        if(!CatchAllController.instance){
            CatchAllController.instance = new CatchAllController(logger);
        }
        const instance = CatchAllController.instance;

        instance.router.use(instance.handleCatchAll);

        return instance;
    }

    handleCatchAll = (req: Request, res: Response) =>{
        try{
            throw createHttpError.NotFound('Route not found.');
        }catch(e:unknown){
            throw createHttpError.Custom(e.statusCode, e.message, e.errors)
        }
    }




}