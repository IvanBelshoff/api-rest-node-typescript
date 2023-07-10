import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Cidade } from '../entities';


export default class CitySeeder implements Seeder {
    public async run(
        _dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        // ---------------------------------------------
        const userFactory = await factoryManager.get(Cidade);
        // save 1 factory generated entity, to the database
        await userFactory.save();

        // save 5 factory generated entities, to the database
        await userFactory.saveMany(0);
    }
}