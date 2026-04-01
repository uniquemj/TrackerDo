import { inject, injectable } from "tsyringe";
import { CategoryRepository } from "../repository/category.repository.js";
import type { CategoryParams, PartialCategoryParams } from "../types/model/category.types.js";
import createHttpError from "../config/errorHandler.config.js";

@injectable()
export class CategoryService{
    constructor(@inject(CategoryRepository) private readonly categoryRepository: CategoryRepository){}

    createCategory = async(categoryPayload: CategoryParams) =>{
        try{
            const {title} = categoryPayload;

            const titleExist = await this.categoryRepository.findByTitle(title);
            if(titleExist){
                throw createHttpError.BadRequest('Title with this Category exist.')
            }
            const category = await this.categoryRepository.create(categoryPayload);
            return category;
        }catch(e: unknown){
            throw createHttpError.InternalServerError('Internal Server Error: ', e);
        }
    }

    updateCategory = async(category_id: string, udpateParams: PartialCategoryParams) =>{
        try{
            this.getCategoryById(category_id);
            const updateCategory = await this.categoryRepository.update(category_id, udpateParams);
            return updateCategory;
        }catch(e:unknown){
            throw createHttpError.InternalServerError('Internal Server Error: ', e);
        }
    }

    getAllCategory = async() =>{
        try{
            const allCategory = await this.categoryRepository.findAll();
            return allCategory;
        }catch(e:unknown){
            throw createHttpError.InternalServerError('Internal Server Error: ', e);
        }
    }

    getCategoryById = async(category_id: string) =>{
        try{
            const categoryExist = await this.categoryRepository.findById(category_id);
            if(!categoryExist){
                throw createHttpError.NotFound("Category with ID doesn't exist.")
            }
            return categoryExist
        }catch(e: unknown){
            throw createHttpError.InternalServerError('Internal Server Error: ', e);
        }
    }

    deleteCategory = async(category_id: string) => {
        try{
            this.getCategoryById(category_id)
            const category = this.categoryRepository.remove(category_id);
            return category
        }catch(e: unknown){
            throw createHttpError.InternalServerError('Internal Server Error: ', e);
        }
    }
}