import express from 'express';
import 'reflect-metadata';
import 'dotenv/config';
import {Logger} from './config/logger.config.js';
import apiRoute from './router/index.js';
import cookieParser from 'cookie-parser';

// Express APP Definition
const app = express();
const VERSION = process.env.VERSION ?? 'v1';
const logger = Logger.getInstance().getLogger();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// API Route
app.use(`/api/${VERSION}/`, apiRoute)


// Server Load
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, ()=>{
    try{
        logger.info(`Server connected to PORT: ${PORT}.`)
    }catch{
        throw new Error('Internal Server Error.')
    }
})