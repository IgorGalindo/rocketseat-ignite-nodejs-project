import { Request, Response } from 'express';

import { Category } from '../../model/Category';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;
        let category: Category;

        try {
            category = this.createCategoryUseCase.execute({
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
