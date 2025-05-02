import { Entity  , PrimaryGeneratedColumn , Column } from "typeorm";

@Entity("User")
export class UserModel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

}