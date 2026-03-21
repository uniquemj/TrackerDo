import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/prisma/client.js";
import { singleton } from "tsyringe";

@singleton()
export class PrismaService extends PrismaClient{
    private static instance: PrismaService;

    constructor(){
        const adapter = new PrismaNeon({connectionString: process.env.DATABASE_URL})
        super({adapter});
    }

    static init(){
        try{
            if(!PrismaService.instance){
                PrismaService.instance = new PrismaService()
            }
            const instance = PrismaService.instance
            instance.connect();
            return instance;
        } catch (e:unknown){
            this.instance.disconnect();
            throw new Error('DB Error', e)
        }
    }

    private async connect(){
        await this.$connect();
    }

    private async disconnect(){
        await this.disconnect();
    }
}