import { Router, type Response } from "express";
import { inject } from "tsyringe";
import type winston from "winston";
import type { Logger } from "../config/logger.config.js";
import { TodoService } from "../services/todo.services.js";
import type { AuthRequest } from "../types/utils/user.types.js";
import { handleSuccessResponse } from "../helper/successResponse.helper.js";
import type { PaginationData, searchParams } from "../types/utils/search.types.js";
import { AuthMiddleware } from "../middlewares/auth.middlewares.js";

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
        
        instance.router.get('/', AuthMiddleware, instance.getAllTask);
        instance.router.get('/:id', AuthMiddleware, instance.getTaskById);
        instance.router.post('/', AuthMiddleware, instance.createTask);
        instance.router.put('/:id', AuthMiddleware, instance.updateTask);
        instance.router.delete('/:id', AuthMiddleware, instance.deleteTask);
        return instance;
    }

    createTask = async(req: AuthRequest, res: Response) =>{
        this.logger.debug('Initializing Task Creation')
        const taskParams = req.body
        const {user_id} = req.user!;
        const result = await this.todoService.createTask(user_id, taskParams)
        this.logger.debug('Task Created.')

        this.logger.info('Task Created.')
        handleSuccessResponse(res, true, 'Task Created.', result);
    }

    updateTask = async(req: AuthRequest, res: Response) =>{
        this.logger.debug('Initializing Task Update.')
        const task_id = req.params.id as string;
        const updateParams = req.body;
        const {user_id} = req.user!;
        const result = await this.todoService.updateTask(user_id, task_id, updateParams);
        this.logger.debug('Task Updated.');

        this.logger.info('Task Updated.');
        handleSuccessResponse(res, true, 'Task Updated.', result);
    }

    deleteTask = async(req: AuthRequest, res: Response) =>{
        this.logger.debug('Initializing Task Delete.')
        const task_id = req.params.id as string;
        const {user_id} = req.user!;
        const result = await this.todoService.deleteTask(user_id, task_id);
        this.logger.debug('Task Deleted.');
        
        this.logger.debug('Task Deleted.');
        handleSuccessResponse(res, true, 'Task Deleted.', result);
    }

    getAllTask = async(req: AuthRequest, res: Response) =>{
        this.logger.debug('Fetching Tasks.');
        const {title, status, page, limit} = req.query;
        const {user_id} = req.user!;

        const queryParams: searchParams = {
            user_id: user_id,
            title: title as string,
            status: status as string
        };

        const paginationParams: PaginationData = {
            page: parseInt(page as string),
            limit: parseInt(limit as string)
        };
        const result = await this.todoService.getAllTask(queryParams, paginationParams);
        this.logger.debug('Fetched Tasks.');
        
        this.logger.info('Fetched Tasks.');
        handleSuccessResponse(res, true, 'Fetched Tasks.', result);
    }

    getTaskById = async(req: AuthRequest, res: Response) =>{
        this.logger.debug('Fetch Task By Id.')
        const task_id = req.params.id as string;
        const {user_id} = req.user!;

        const result = await this.todoService.getTaskById(user_id, task_id);
        this.logger.debug('Fetched Task By Id')
        
        this.logger.info('Fetched Task By Id')
        handleSuccessResponse(res, true, 'Fetched Task By Id.',result);
    }
}