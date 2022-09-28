import { Request, Response } from 'express';

import { Category } from '../../entities/Category';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        let category: Category;

        try {
            category = await this.createCategoryUseCase.execute({
                name,
                description,
            });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }

        return response.status(201).json(category);
    }
}

export { CreateCategoryController };
