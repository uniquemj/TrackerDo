import winston from 'winston';


export class Logger{
    private static instance: Logger;

    private constructor(){}

    static getInstance(){
        if(!Logger.instance){
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    getLogger(){
        const {combine, colorize, printf, timestamp, align} = winston.format;
        return winston.createLogger(
                {
                    level: process.env.LOG_LEVEL ?? 'debug',
                    format: combine(
                        colorize({all: true}),
                        timestamp({
                            format: 'YYYY-MM-DD HH:MM:SS.s A'
                        }),
                        align(),
                        printf((info)=>`[${info.timestamp}]${info.level}:${info.message}`)
                    ),
                    transports: [new winston.transports.Console()]
                }
            )
        
    }
}