import express, { Router } from 'express'
import { Logger } from '../config/logger.config.js';
import { HealthController } from '../controller/health.controller.js';
import { AuthUserController } from '../controller/auth.controller.js';
import {container} from '../config/container.config.js';
import { AuthUserService } from '../services/auth.services.js';
import { CategoryController } from '../controller/category.controller.js';
import { CategoryService } from '../services/category.services.js';

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

router.use('/auth', authUserController.router);
router.use('/category', categoryController.router);
export default router;