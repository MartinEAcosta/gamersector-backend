import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "./UserModel";


@Entity("Address")
export class AddressModel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    city: string;

    @Column()
    street: string;

    @ManyToMany((type) => UserModel , (user) => user.addresses)
    users: UserModel[];
}