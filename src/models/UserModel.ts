import { Entity  , PrimaryGeneratedColumn , Column, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { AddressModel } from "./AddressModel";
import { RoleModel } from "./RoleModel";

@Entity("User")
export class UserModel {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column() 
    password: string;

    @ManyToMany((type) => AddressModel , (address) => address.users, {
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

    @ManyToMany((type) => RoleModel , (role) => role.user , { nullable : true } )
    @JoinTable({
        name: "User_Role",
        joinColumn: {
            name:"id_user",
            referencedColumnName:"id",
        },
        inverseJoinColumn: {
            name: "id_role",
            referencedColumnName: "id",
        }
    })
    role: RoleModel[];

}