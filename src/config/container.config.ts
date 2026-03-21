import {container} from 'tsyringe'
import { AuthUserService } from '../services/auth.services.js'
import { PrismaService } from './prismaService.config.js';

//Prisma
container.register('PrismaService', {useClass: PrismaService})

// User
container.register(AuthUserService, {useClass: AuthUserService});

export {container};