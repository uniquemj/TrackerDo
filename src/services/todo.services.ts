import { inject, injectable } from "tsyringe";
import { TodoRepository } from "../repository/todo.repository.js";
import {
  Status,
  type TodoParams,
  type UpdateTodoParams,
} from "../types/model/todo.types.js";
import type {
  PaginationData,
  searchParams,
} from "../types/utils/search.types.js";
import createHttpError from "../config/errorHandler.config.js";

@injectable()
export class TodoService {
  constructor(
    @inject(TodoRepository) private readonly todoRepository: TodoRepository,
  ) {}

  getAllTask = async (
    queryParam: searchParams,
    paginationData?: PaginationData,
  ) => {
    try {
      const tasks = await this.todoRepository.findAll(
        queryParam,
        paginationData,
      );
      return tasks;
    } catch (e) {
      throw createHttpError.InternalServerError("Internal Server Error: ", e);
    }
  };

  getTaskById = async (user_id: string, task_id: string) => {
    try {
      const taskExist = await this.todoRepository.findById(task_id);
      if (!taskExist) {
        throw createHttpError.NotFound("Task with Id not exist.");
      }

      if (user_id !== taskExist.user_id) {
        throw createHttpError.BadRequest("Task with Id doesn't exist.");
      }

      return taskExist;
    } catch (e: unknown) {
      throw createHttpError.InternalServerError("Internal Server Error: ", e);
    }
  };

  createTask = async (user_id: string, taskPayload: TodoParams) => {
    try {
      let { title, description, start_time, end_time, status, category_id } =
        taskPayload;

      // If start_time and end_time is not present
      // then start_time will be current time and end time will be 2 hours ahead of current time
      if (!start_time && !end_time) {
        const start_date = new Date();
        const end_date = new Date(start_date);
        end_date.setHours(start_date.getHours() + 2);

        start_time = start_date;
        end_time = end_date;
      }

      const finalPayload: TodoParams = {
        title,
        description: description ?? "",
        status: status ?? Status.TODO,
        start_time: start_time,
        end_time: end_time,
        category_id,
        user_id,
      };

      const task = await this.todoRepository.createTask(finalPayload);
      return task;
    } catch (e: unknown) {
      throw createHttpError.Custom(e.statusCode, e.message, e.errors);
    }
  };

  updateTask = async (
    user_id: string,
    task_id: string,
    updateParams: UpdateTodoParams,
  ) => {
    try {
      const task = await this.getTaskById(user_id, task_id);
      const updateTask = this.todoRepository.updateTask(task_id, updateParams);
      return updateTask;
    } catch (e: unknown) {
      throw createHttpError.Custom(e.statusCode, e.message, e.errors);
    }
  };

  deleteTask = async (user_id: string, task_id: string) => {
    try {
      await this.getTaskById(user_id, task_id);
      const result = this.todoRepository.deleteTask(task_id);
      return result;
    } catch (e: unknown) {
      throw createHttpError.Custom(e.statusCode, e.message, e.errors);
    }
  };
}
