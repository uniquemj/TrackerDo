import type { NextFunction, Request, Response } from "express";
import { JWTVerify } from "../utils/helper.utils.js";
import type { AuthRequest } from "../types/utils/user.types.js";


export const AuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const cookie = req.cookies.token;
        if(!cookie){
            throw new Error('UnAuthenticated');
        }

        const payload = JWTVerify(cookie);
        
        req.user = {user_id: payload.user_id, email: payload.email}
        next()
    }catch(e){
        throw new Error(e);
    }
}