import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoriesController } from './importCategoriesController';
import { ImportCategoriesUseCase } from './importCategoriesUseCase';

export default (): ImportCategoriesController => {
    const categoriesRepository = null;
    const importCategoriesUseCase = new ImportCategoriesUseCase(
        categoriesRepository
    );
    const importCategoriesController = new ImportCategoriesController(
        importCategoriesUseCase
    );

    return importCategoriesController;
};
