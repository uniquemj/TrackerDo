import bcrypt from "bcryptjs";


export const hashPassword = async (userInput: string): Promise<string> =>{
    const SALT = process.env.SALT ?? 10;
    const finalPassword = await bcrypt.hash(userInput, SALT);
    return finalPassword
}

export const comparePassword = async(userInput: string, hashPassword: string): Promise<boolean> => {
    const isSamePassword = await bcrypt.compare(userInput, hashPassword);
    return isSamePassword;
}