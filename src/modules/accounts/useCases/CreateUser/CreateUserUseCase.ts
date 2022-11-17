import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        password,
        email,
        driver_license,
    }: ICreateUserDTO): Promise<User> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError('User already exists!');
        }

        const passwordHash = await hash(password, 8);

        const userCreated = await this.usersRepository.create({
            name,
            password: passwordHash,
            email,
            driver_license,
        });

        const user = {
            id: userCreated.id,
            name: userCreated.name,
            email: userCreated.email,
            driver_license: userCreated.driver_license,
            isAdmin: userCreated.isAdmin,
            avatar: userCreated.avatar,
            created_at: userCreated.created_at,
            password: userCreated.password,
        };
        delete user.avatar;
        delete user.password;

        return user;
    }
}

export { CreateUserUseCase };
