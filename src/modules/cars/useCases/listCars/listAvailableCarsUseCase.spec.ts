import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './listAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it('should be able to list all available cars', async () => {
        const car = carsRepositoryInMemory.create({
            name: 'Car1',
            description: 'Car description',
            daily_rate: 110.0,
            license_plate: 'DEF1234',
            fine_amount: 40,
            brand: 'Car_Brand',
            category_id: 'category_id',
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it('should be able to list all available cars by brand', async () => {
        const car = carsRepositoryInMemory.create({
            name: 'Car2',
            description: 'Car description',
            daily_rate: 110.0,
            license_plate: 'DEF2222',
            fine_amount: 40,
            brand: 'Car_Brand_2',
            category_id: 'category_id',
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: 'Car_Brand_2',
        });

        expect(cars).toEqual([car]);
    });

    it('should be able to list all available cars by name', async () => {
        const car = carsRepositoryInMemory.create({
            name: 'Car3',
            description: 'Car description',
            daily_rate: 110.0,
            license_plate: 'DEF3333',
            fine_amount: 40,
            brand: 'Car_Brand_3',
            category_id: 'category_id',
        });

        const cars = await listAvailableCarsUseCase.execute({ name: 'Car3' });

        expect(cars).toEqual([car]);
    });

    it('should be able to list all available cars by category', async () => {
        const car = carsRepositoryInMemory.create({
            name: 'Car4',
            description: 'Car description',
            daily_rate: 110.0,
            license_plate: 'DEF4444',
            fine_amount: 40,
            brand: 'Car_Brand_4',
            category_id: 'category_id_4',
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: 'category_id_4',
        });

        expect(cars).toEqual([car]);
    });
});
