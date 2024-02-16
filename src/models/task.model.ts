import { Entity, PrimaryGeneratedColumn,Column } from "typeorm"


export enum TaskStatus{
    TO_DO="To_do",
    IN_PROGRESS="In_Progress",
    DONE="Done"
}

@Entity('Task')
export class Task{
    @PrimaryGeneratedColumn("uuid")
    id!:string
    @Column()
    title!:string
    @Column()
    description!:string
    @Column({default:TaskStatus.TO_DO})
    status!:TaskStatus
}
