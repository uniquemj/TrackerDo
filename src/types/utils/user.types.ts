import type { Request } from "express";
import type { JWTUserPayload } from "../model/user.types.js";

export interface AuthRequest extends Request{
    user?: JWTUserPayload
}