import { Entity  , PrimaryGeneratedColumn , Column, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { UserModel } from "./UserModel";

@Entity("Role")
export class RoleModel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    @ManyToMany((type) => UserModel, (user) => user)
    user: UserModel[];
}