import { Entity  , PrimaryGeneratedColumn , Column, ManyToOne, JoinColumn } from "typeorm";
import { CategoryModel } from "./CategoryModel";

@Entity("Product")
export class ProductModel  {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'double precision' })
    price: number;

    @Column()
    imgURL: string;

    @Column({ nullable: true })
    reviews: number;

    @Column()
    stock: number;

    @Column({ default: false })
    offer: boolean;

    @Column({ nullable: true , type: "double precision" })
    discount: number;

    @ManyToOne((type) => CategoryModel , (category) => category.products )
    @JoinColumn({
        name: 'id_category',
        referencedColumnName: "id",
        foreignKeyConstraintName: "FK_ID_CATEGORY"
    })
    category: CategoryModel;


}