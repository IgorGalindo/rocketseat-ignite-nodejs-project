import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { Category } from '../../entities/Category';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
        let category: Category;

        try {
            category = await createCategoryUseCase.execute({
                name,
                description,
            });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }

        return response.status(201).json(category);
    }
}

export { CreateCategoryController };
