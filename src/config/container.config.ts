import {container} from 'tsyringe'
import { AuthUserService } from '../services/auth.services.js'
import { PrismaService } from './prismaService.config.js';
import { UserRepository } from '../repository/user.repository.js';

//Prisma
container.register('PrismaService', {useClass: PrismaService})

// User
container.register(AuthUserService, {useClass: AuthUserService});
container.register(UserRepository, {useClass: UserRepository})
export {container};