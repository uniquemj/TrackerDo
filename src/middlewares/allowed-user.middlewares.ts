import type { NextFunction, Response } from "express"
import type { AuthRequest } from "../types/utils/user.types.js"
import type { JWTUserPayload } from "../types/model/user.types.js";
import createHttpError from "../config/errorHandler.config.js";

export const AllowedUser = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) =>{
        const {role} = req.user!;
        if(!roles.includes(role)){
            throw createHttpError.Forbidden('Forbidden.')
        }
        next()
    }
}