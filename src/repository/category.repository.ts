import { inject, injectable } from "tsyringe";
import type { PrismaService } from "../config/prismaService.config.js";
import type { CategoryParams, PartialCategoryParams } from "../types/model/category.types.js";

@injectable()
export class CategoryRepository{
    constructor(@inject('PrismaService') private readonly prismaService: PrismaService){}

    async findAll(){
        const result = await this.prismaService.category.findMany();
        return result;
    }

    async findById(category_id: string){
        const result = await this.prismaService.category.findUnique({where: {category_id: category_id}})
        return result
    }

    async findByTitle(title: string){
        const result = await this.prismaService.category.findFirst({where: {title: {contains: title}}})
        return result
    }
    async create(categoryPayload: CategoryParams){
        const result = await this.prismaService.category.create({
            data: {...categoryPayload}
        })
        return result
    }

    async update(category_id: string, updateParams: PartialCategoryParams){
        const result = await this.prismaService.category.update({
            where: {category_id: category_id},
            data: {...updateParams}
        })
        return result;
    }

    async remove(category_id: string){
        const result = await this.prismaService.category.delete({where: {category_id: category_id}});
        return true
    }
}