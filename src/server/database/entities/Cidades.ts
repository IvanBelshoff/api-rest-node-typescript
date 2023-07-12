
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pessoa } from './Pessoas';

@Entity('cidades')
export class Cidade {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    // eslint-disable-next-line indent
    id!: number;

    @Column({ type: 'varchar', nullable: false, length: 150, comment: 'Tabela usada para armazenar cidades do sistema' })
    // eslint-disable-next-line indent
    nome!: string;

    @OneToMany(() => Pessoa, pessoa => pessoa.cidade, {
        cascade: true,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })

    // eslint-disable-next-line indent
    pessoa!: Cidade[];
}