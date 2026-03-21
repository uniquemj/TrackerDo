import express from 'express'
import { Logger } from '../config/logger.config.js';
import { HealthController } from '../controller/health.controller.js';

const router = express.Router();
const logger = Logger.getInstance();

//HealthController
const healthController = HealthController.initController(logger);

router.use('/health-check', healthController.router)

export default router;