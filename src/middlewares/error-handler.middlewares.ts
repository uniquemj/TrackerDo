import type { NextFunction, Request, Response } from "express";
import type { ErrorPayload } from "../types/utils/error.types.js";
import { Logger } from "../config/logger.config.js";

const logger = Logger.getInstance().getLogger();

export const errorHandler = (err: ErrorPayload, req: Request, res: Response, next: NextFunction) =>{
    const statusCode = err.statusCode ?? 500;
    const message = err.message ?? "Internal Server Error";
    const stack = err.errors ?? [];
    logger.error(message, statusCode, stack)
    res.status(statusCode).send({message: message, success: false})
}