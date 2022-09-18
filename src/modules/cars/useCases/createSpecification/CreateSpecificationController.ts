import { Request, Response } from 'express';

import { Specification } from '../../model/Specification';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
    constructor(
        private createSpecificationUseCase: CreateSpecificationUseCase
    ) {}

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;
        let specification: Specification;

        try {
            specification = this.createSpecificationUseCase.execute({
                name,
                description,
            });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }

        return response.status(201).json(specification);
    }
}

export { CreateSpecificationController };
