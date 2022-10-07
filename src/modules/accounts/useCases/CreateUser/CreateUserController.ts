import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { User } from '../../entities/User';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, password, email, driver_license } = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);
        let user: User;
        try {
            user = await createUserUseCase.execute({
                name,
                password,
                email,
                driver_license,
            });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }

        return response.status(201).json(user);
    }
}

export { CreateUserController };
