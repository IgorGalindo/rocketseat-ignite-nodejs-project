import { Specification } from '@modules/cars/entities/Specification';

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification>;
    list(): Promise<Specification[]>;
    findByName(name: string): Promise<Specification>;
}

export { ICreateSpecificationDTO, ISpecificationsRepository };
