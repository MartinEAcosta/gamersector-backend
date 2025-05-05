import { Entity  , PrimaryGeneratedColumn , Column, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { AddressModel } from "./AddressModel";

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

    @ManyToMany( (type) => AddressModel, (address) => address.users, {
        cascade: true
    })
    @JoinTable({
        name: "User_Address",
        joinColumn: {
            name: "id_user",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "id_address",
            referencedColumnName: "id",
        }
    })
    addresses: AddressModel[];

}