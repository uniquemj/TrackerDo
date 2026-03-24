import {container} from 'tsyringe'
import { AuthUserService } from '../services/auth.services.js'
import { PrismaService } from './prismaService.config.js';
import { UserRepository } from '../repository/user.repository.js';
import { TodoService } from '../services/todo.services.js';
import { CategoryService } from '../services/category.services.js';
import { CategoryRepository } from '../repository/category.repository.js';

//Prisma
container.register('PrismaService', {useClass: PrismaService});

// User
container.register(AuthUserService, {useClass: AuthUserService});
container.register(UserRepository, {useClass: UserRepository});

// Todo
container.register(TodoService, {useClass: TodoService});

// Category
container.register(CategoryService, {useClass: CategoryService});
container.register(CategoryRepository, {useClass: CategoryRepository});

export {container};