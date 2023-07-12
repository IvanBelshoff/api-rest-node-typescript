
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cidade } from './Cidades';

@Entity('pessoas')
export class Pessoa {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    // eslint-disable-next-line indent
    id!: number;

    @Column({ type: 'text', nullable: false })
    // eslint-disable-next-line indent
    nome!: string;

    @Column({ type: 'text', nullable: false })
    // eslint-disable-next-line indent
    sobrenome!: string;

    @Column({ type: 'text', nullable: false, unique: true })
    // eslint-disable-next-line indent
    email!: string;

    @ManyToOne(() => Cidade, cidade => cidade.pessoa)
    @JoinColumn({ name: 'cidade_id'  })
    // eslint-disable-next-line indent
    cidade?: Cidade;

}