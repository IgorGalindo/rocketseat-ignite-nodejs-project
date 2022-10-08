import { Router } from 'express';
import multer from 'multer';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoriesController } from '../modules/cars/useCases/importCategories/importCategoriesController';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.post(
    '/',
    ensureAuthenticated,
    createCategoryController.handle
);
categoriesRoutes.get('/', ensureAuthenticated, listCategoriesController.handle);
categoriesRoutes.post(
    '/import',
    ensureAuthenticated,
    upload.single('file'),
    importCategoriesController.handle
);

export { categoriesRoutes };
