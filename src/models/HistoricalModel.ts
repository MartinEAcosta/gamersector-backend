import { Entity, PrimaryGeneratedColumn , Column, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { UserModel } from "./UserModel";
import { ProductModel } from "./ProductModel";


@Entity("Historical")
export class HistoricalModel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date_sold: Date;

    @Column({ type: "double precision" })
    price_sold: number;

    // Chequear joincolumn
    @OneToOne( (type) => UserModel , (user) => user.id ) 
    @JoinColumn({
        name: "id_user",
        referencedColumnName: "id",
        foreignKeyConstraintName: "FK_ID_USER"
    })
    user: UserModel;

    @OneToMany( (type) => ProductModel , (product) => product.id )
    @JoinColumn({
        name: "id_product",
        referencedColumnName: "id",
        foreignKeyConstraintName: "FK_ID_PRODUCT"
    })
    product: ProductModel;

}