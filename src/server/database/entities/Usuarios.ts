
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {

    @PrimaryGeneratedColumn()
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

    @Column({ type: 'text', nullable: false, unique: true })
    // eslint-disable-next-line indent
    login!: string;

    @Column({ type: 'text', nullable: false })
    // eslint-disable-next-line indent 
    senha!: string;

    @CreateDateColumn({ nullable: false, type: 'date' })
    // eslint-disable-next-line indent
    data_criacao!: Date;

}