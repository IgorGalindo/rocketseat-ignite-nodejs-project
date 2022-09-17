import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
    const { name, description } = request.body;
    let category;

    const createCategoryService = new CreateCategoryService(
        categoriesRepository
    );

    try {
        category = createCategoryService.execute({ name, description });
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }

    return response.status(201).json(category);
});

categoriesRoutes.get('/', (request, response) => {
    const allCategories = categoriesRepository.list();
    return response.json(allCategories);
});

export { categoriesRoutes };
