import { setSeederFactory as citySeederFactory  } from 'typeorm-extension';
import { Cidade } from '../entities/Cidades';

export default citySeederFactory(Cidade, (faker) => {
    const city = new Cidade();
    city.nome = faker.location.city();

    return city;
});

