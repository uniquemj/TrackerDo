import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

import type { JWTUserPayload } from "../types/model/user.types.js";
import type{ Response } from "express";
import { COOKIE } from "../constant/cookie.constant.js";


export const hashPassword = async (userInput: string): Promise<string> =>{
    const SALT = process.env.SALT ?? 10;
    const finalPassword = await bcrypt.hash(userInput, SALT);
    return finalPassword
}

export const comparePassword = async(userInput: string, hashPassword: string): Promise<boolean> => {
    const isSamePassword = await bcrypt.compare(userInput, hashPassword);
    return isSamePassword;
}

export const JWTSign = (userPayload:JWTUserPayload):string=>{
    const JWT_SECRET = process.env.JWT_SECRET as string
    const token = jwt.sign({...userPayload}, JWT_SECRET,{
        expiresIn: '1h'
    })
    return token
}

export const JWTVerify = (token: string): JWTUserPayload =>{
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const verifyJWT = jwt.verify(token, JWT_SECRET) as JWTUserPayload;
    return verifyJWT
}

export const setCookie = (res: Response, token: string) =>{
    res.cookie(
        COOKIE.USER_TOKEN, 
        token,
        {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 24*60*60*1000
        }
    )
}

export const removeCookie = (res: Response, cookieName: string) =>{
    res.clearCookie(cookieName);
}