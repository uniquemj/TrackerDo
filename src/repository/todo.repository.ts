import { inject, injectable } from "tsyringe";
import type { PrismaService } from "../config/prismaService.config.js";
import type { Prisma } from "../generated/prisma/client.js";
import type { TodoParams, UpdateTodoParams } from "../types/model/todo.types.js";
import type { PaginationData, searchParams } from "../types/utils/search.types.js";

@injectable()
export class TodoRepository{
    constructor(@inject('PrismaService') private readonly prismaService: PrismaService){}

    async findAll(queryParam: searchParams, pagination?: PaginationData){
        const {user_id, title, status} = queryParam;

        let filter: Prisma.taskFindManyArgs = {where: {user_id: user_id}, orderBy: {created_at: 'desc'}};
        if(title){
            filter.where!.title =  {contains: title, mode: 'insensitive'}
        }
        if(status){
            filter.where!.status = status
        }
        if(pagination?.page && pagination?.limit){
            let {page, limit} = pagination;
            let skip = (page - 1) * limit;

            filter.skip = skip;
            filter.take = limit;
        }
        const tasks = await this.prismaService.task.findMany(filter)
        return tasks
    }

    async findById(taskId: string){
        const task = await this.prismaService.task.findFirst({where: {task_id: taskId}});
        return task;
    }

    async createTask(taskPayload: TodoParams){
        const task = await this.prismaService.task.create({data: {...taskPayload}});
        return task;
    }

    async updateTask(task_id: string, updateParams: UpdateTodoParams){
        const task = await this.prismaService.task.update({
            where: {task_id: task_id},
            data: {...updateParams}
        });
        return task;
    }

    async deleteTask(task_id: string){
        const task = await this.prismaService.task.delete({
            where: {task_id: task_id}
        })
        return true;
    }
}