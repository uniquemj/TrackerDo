import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

import type { JWTUserPayload } from "../types/model/user.types.js";


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
    console.log(JWT_SECRET)
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