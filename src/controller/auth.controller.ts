import { Router, type Request, type Response } from "express";
import winston from "winston";
import {Logger} from "../config/logger.config.js";
import type { AuthUserService } from "../services/auth.services.js";
import type { UserParams } from "../types/model/user.types.js";
import { handleSuccessResponse } from "../helper/successResponse.helper.js";

export class AuthUserController{
    private static instance: AuthUserController;
    readonly router: Router;
    private readonly logger: winston.Logger;

    private constructor(logger:Logger, private readonly authUserService: AuthUserService){
        this.router = Router(),
        this.logger = logger.getLogger();
    }

    static initController(logger: Logger, authUserService: AuthUserService){
        if(!AuthUserController.instance){
            AuthUserController.instance = new AuthUserController(logger, authUserService);
        }
        const instance = AuthUserController.instance;

        instance.router.post('/users', instance.createUser);

        return instance
    }

    createUser = async (req: Request, res: Response) => {
        this.logger.debug('User Creation Initialize.')
        const userParams = req.body as UserParams
        const result = await this.authUserService.createUser(userParams);
        this.logger.debug('User Created.')
        handleSuccessResponse(res, true, 'User Created.', {token: result})
    }
}