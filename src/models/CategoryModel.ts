import { Entity , PrimaryGeneratedColumn , Column, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { ProductModel } from "./ProductModel";

@Entity("Category")
export class CategoryModel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany( (type) => ProductModel , (product) => product.category )
    products: ProductModel[];
    
}