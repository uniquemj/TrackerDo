import { Router } from "express";
import { inject } from "tsyringe";
import type winston from "winston";
import type { Logger } from "../config/logger.config.js";
import { TodoService } from "../services/todo.services.js";

export class TodoController{
    readonly router: Router;
    private static instance: TodoController;
    private readonly logger: winston.Logger;
    private constructor(logger: Logger, private readonly todoService: TodoService){
        this.router = Router();
        this.logger = logger.getLogger();
    }

    static initController(logger: Logger, todoService: TodoService){
        if(!TodoController.instance){
            TodoController.instance = new TodoController(logger, todoService);
        }
        const instance = TodoController.instance;
        // route goes here
        
        return instance;
    }
}