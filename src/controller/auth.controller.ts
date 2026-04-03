import { Router, type Request, type Response } from "express";
import winston from "winston";
import {Logger} from "../config/logger.config.js";
import type { AuthUserService } from "../services/auth.services.js";
import { LoginUserSchema, UserSchema, type JWTUserPayload, type LoginUserParams, type UserParams } from "../types/model/user.types.js";
import { handleSuccessResponse } from "../helper/successResponse.helper.js";
import { removeCookie, setCookie } from "../utils/helper.utils.js";
import { COOKIE } from "../constant/cookie.constant.js";
import { AuthMiddleware } from "../middlewares/auth.middlewares.js";
import type { AuthRequest } from "../types/utils/user.types.js";
import { validate } from "../middlewares/validate.middlewares.js";

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

        instance.router.post('/signup',validate(UserSchema), instance.createUser);
        instance.router.post('/login', validate(LoginUserSchema), instance.loginUser);
        instance.router.post('/logout', AuthMiddleware, instance.logOutUser);
        instance.router.get('/user/me', AuthMiddleware, instance.getMe);

        return instance;
    }

    createUser = async (req: Request, res: Response) => {
        this.logger.debug('User Creation Initialize.')
        const userParams = req.body as UserParams
        const result = await this.authUserService.createUser(userParams);
        this.logger.info('User Created.')
        
        this.logger.debug('Setting Token in Cookie.')
        setCookie(res, result)
        this.logger.debug('Token set to cookie.')
        
        this.logger.info('User Logged in.')
        handleSuccessResponse(res, true, 'User Created.', {token: result})
    }

    loginUser = async(req: Request, res: Response) => {
        this.logger.debug('Initializing User Loging.')
        const loginParams = req.body as LoginUserParams

        const result = await this.authUserService.loginUser(loginParams);

        this.logger.debug('Setting Token in Cookie.')
        setCookie(res, result)
        this.logger.debug('Token set to cookie.')
        
        this.logger.info('User Logged in.')
        handleSuccessResponse(res, true,'User logged in.', {token: result})
    }

    logOutUser = async(req: AuthRequest, res: Response) => {
        this.logger.debug('Initializing User Log out.')

        this.logger.debug('Clearing Cookie')
        removeCookie(res, COOKIE.USER_TOKEN);
        this.logger.debug('Cleared Cookie')

        this.logger.debug('User logged out.')
        handleSuccessResponse(res, true, 'User logged out.', true)
    }

    getMe = async(req: AuthRequest, res: Response) =>{
        this.logger.debug('Getting My Profile.')
        const user = req.user as JWTUserPayload;
        const result = await this.authUserService.getMe(user);
        this.logger.debug('Fetched My Profile.')

        this.logger.info('User Profile Fetched.')
        handleSuccessResponse(res, true, 'User Profile Fetched.', {profile: result})
    }


}