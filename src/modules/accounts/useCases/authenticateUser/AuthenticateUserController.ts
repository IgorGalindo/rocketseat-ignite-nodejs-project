import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUserUseCase = container.resolve(
            AuthenticateUserUseCase
        );

        let token;

        try {
            token = await authenticateUserUseCase.execute({
                email,
                password,
            });
        } catch (error) {
            return response.status(401).json({ error: error.message });
        }

        return response.status(200).json(token);
    }
}

export { AuthenticateUserController };
