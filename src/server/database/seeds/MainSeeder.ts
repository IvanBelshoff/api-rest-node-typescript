import { DataSource } from 'typeorm';
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';
import CitySeeder from './cidades.seeds';

export class MainSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        factoryManager: SeederFactoryManager
    ): Promise<void> {
        await runSeeder(dataSource, CitySeeder);
    }
}