import type { NextFunction, Request, Response } from "express"
import type { ZodType } from "zod"
import createHttpError from "../config/errorHandler.config.js"

export const validate = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) =>{
        try{
            const validation = schema.safeParse(req.body);
            if(!validation.success){
                const formattedError = validation.error.issues.map((issue)=>`${issue.path} : ${issue.message}`)
                throw createHttpError.BadRequest('Validation Error.', formattedError)
            }
            req.body = validation.data;
            next();
        }catch(e: unknown){
            throw createHttpError.Custom(e.statusCode, e.message, e.errors);
        }
    }
}