import {container} from 'tsyringe'
import { AuthUserService } from '../services/auth.services.js'
import { PrismaService } from './prismaService.config.js';
import { UserRepository } from '../repository/user.repository.js';
import { TodoService } from '../services/todo.services.js';
import { CategoryService } from '../services/category.services.js';
import { CategoryRepository } from '../repository/category.repository.js';
import { TodoRepository } from '../repository/todo.repository.js';
import { WorkTimeService } from '../services/worktime.services.js';
import { WorkTimeRepository } from '../repository/worktime.repository.js';

//Prisma
container.register('PrismaService', {useClass: PrismaService});

// User
container.register(AuthUserService, {useClass: AuthUserService});
container.register(UserRepository, {useClass: UserRepository});

// Todo
container.register(TodoService, {useClass: TodoService});
container.register(TodoRepository, {useClass: TodoRepository});

// Category
container.register(CategoryService, {useClass: CategoryService});
container.register(CategoryRepository, {useClass: CategoryRepository});

// WorkTime
container.register(WorkTimeService, {useClass: WorkTimeService});
container.register(WorkTimeRepository, {useClass: WorkTimeRepository});

export {container};