import express, { Router } from 'express'
import { Logger } from '../config/logger.config.js';
import { HealthController } from '../controller/health.controller.js';
import { AuthUserController } from '../controller/auth.controller.js';
import {container} from '../config/container.config.js';
import { AuthUserService } from '../services/auth.services.js';
import { CategoryController } from '../controller/category.controller.js';
import { CategoryService } from '../services/category.services.js';
import { TodoService } from '../services/todo.services.js';
import { TodoController } from '../controller/todo.controller.js';
import { WorkTimeService } from '../services/worktime.services.js';
import { WorkTimeController } from '../controller/worktime.controller.js';

const router:Router = express.Router();
const logger = Logger.getInstance();

//HealthController
const healthController = HealthController.initController(logger);
router.use('/health-check', healthController.router);

// UserController
const authUserService = container.resolve(AuthUserService);
const authUserController = AuthUserController.initController(logger, authUserService);

// CategoryController
const categoryService = container.resolve(CategoryService);
const categoryController = CategoryController.initController(logger, categoryService);

// TaskController
const taskService = container.resolve(TodoService);
const taskController = TodoController.initController(logger, taskService);

// WorkTimeController
const workTimeService = container.resolve(WorkTimeService);
const workTimeController = WorkTimeController.initController(logger, workTimeService);

router.use('/auth', authUserController.router);
router.use('/category', categoryController.router);
router.use('/tasks', taskController.router);
router.use('/work-time', workTimeController.router);
export default router;