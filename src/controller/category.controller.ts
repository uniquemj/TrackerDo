import { Router, type Request, type Response } from "express";
import type winston from "winston";
import type { Logger } from "../config/logger.config.js";
import type { CategoryService } from "../services/category.services.js";
import { AuthMiddleware } from "../middlewares/auth.middlewares.js";
import { handleSuccessResponse } from "../helper/successResponse.helper.js";

export class CategoryController{
    private static instance: CategoryController;
    readonly router: Router;
    private readonly logger: winston.Logger;

    private constructor(logger: Logger, private readonly categoryService: CategoryService){
        this.router = Router();
        this.logger = logger.getLogger();
    }

    static initController(logger: Logger, categoryService: CategoryService){
        if(!CategoryController.instance){
            CategoryController.instance = new CategoryController(logger, categoryService);
        }
        const instance = CategoryController.instance;
        instance.router.post('/', AuthMiddleware, instance.createCategory);
        instance.router.put('/:id', AuthMiddleware, instance.updateCategory);
        instance.router.get('/', AuthMiddleware, instance.getAllCategory);
        instance.router.get('/:id', AuthMiddleware, instance.getCategoryById);
        instance.router.delete('/:id', AuthMiddleware, instance.deleteCategory);
        return instance
    }

    createCategory = async(req: Request, res: Response) =>{
        this.logger.debug('Initializing Category Creation.')
        const categoryPayload = req.body;
        const result = await this.categoryService.createCategory(categoryPayload);
        this.logger.debug('Category Created.')
        
        this.logger.info('Category Created.')
        handleSuccessResponse(res, true, 'Category Created.', result);
    }

    updateCategory = async(req: Request, res: Response) =>{
        this.logger.debug('Initializing Category Update.');
        const updatePayload = req.body
        const category_id = req.params.id as string

        this.logger.debug(`Updating Category for id: ${category_id}`)
        const result = await this.categoryService.updateCategory(category_id, updatePayload);
        this.logger.debug('Category Updated.')

        this.logger.info('Category Updated.')
        handleSuccessResponse(res, true, 'Category Updated', result)
    }

    getAllCategory = async(req: Request, res: Response) =>{
        this.logger.debug('Initializing Fetch All Category.');
        const paginationInfo = req.query;

        this.logger.debug('Fetching All Category');
        const result = await this.categoryService.getAllCategory();
        this.logger.debug('Fetched All Category.');

        this.logger.info('Fetched All Category');
        handleSuccessResponse(res, true, 'Fetched All Category', result)
    }

    getCategoryById = async(req: Request, res: Response) =>{
        this.logger.debug('Initializing Fetch Category By Id.');
        const category_id = req.params.id as string;

        this.logger.debug(`Fetching Category of ID: ${category_id}`);
        const result = await this.categoryService.getCategoryById(category_id);
        this.logger.debug(`Fetched Category of ID: ${category_id}`);

        this.logger.info(`Fetched Category of ID: ${category_id}`);
        handleSuccessResponse(res, true, 'Fetched Category By ID.', result)
    }

    
    deleteCategory = async(req: Request, res: Response) => {
        this.logger.debug('Initializing Delete Category.');
        const category_id = req.params.id as string;

        this.logger.debug(`Deleting Category of ID: ${category_id}`);
        this.logger.debug(`Deleting Category of ID: ${category_id}`);
        const result = await this.categoryService.deleteCategory(category_id);
        this.logger.debug(`Deleted Category of ID: ${category_id}`);

        this.logger.info(`Deleted Category of ID: ${category_id}`);
        handleSuccessResponse(res, true, 'Deleted Category', result)
    }

}