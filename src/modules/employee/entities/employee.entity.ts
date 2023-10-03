import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employees {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    // Add more properties as needed
}
