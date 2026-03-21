import type { Response } from "express";
import type { SuccessResponse } from "../types/response/response.types.js";

export const handleSuccessResponse = <T>(res: Response, success: boolean, message: string, data: T[] | T, statusCode: number = 200, ...metadata: Array<unknown>) =>{
    const merge = Object.assign({}, ...metadata);

    const response: SuccessResponse<T> = {
        success: success,
        message: message,
        data: data
    }

    if(metadata.length > 0){
        response.paginationData = {...merge}
    }
    res.status(statusCode).send(response)
}