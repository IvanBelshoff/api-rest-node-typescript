import { setSeederFactory,  } from 'typeorm-extension';
import { Cidade } from '../entities/Cidades';

export default setSeederFactory(Cidade, (faker) => {
    const city = new Cidade();
    city.nome = faker.location.city();

    return city;
});

