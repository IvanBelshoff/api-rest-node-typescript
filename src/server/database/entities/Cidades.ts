
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cidades')
export class Cidade {

    @PrimaryGeneratedColumn({type:'bigint'})
    // eslint-disable-next-line indent
    id!: number;

    @Column({ type: 'varchar', nullable: false,length: 150 ,comment: 'Tabela usada para armazenar cidades do sistema' })
    // eslint-disable-next-line indent
    nome!: string;
    

}