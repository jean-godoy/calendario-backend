import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn 
} from 'typeorm';

@Entity('schedule')
class Schedule {

    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column()
    description: string

    @Column()
    hour: number;

    @Column()
    day: number;

    @Column()
    month: number;

    @Column()
    year: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Schedule;