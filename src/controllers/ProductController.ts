import { Request , Response } from 'express';
import { AppDataSource } from '../database/config';
import { ProductModel } from '../models/ProductModel';

const productDataSource = AppDataSource.getRepository(ProductModel);

export const createProduct = ( req : Request , res : Response ) : Promise<void> => {
    try{




        return;
    }
    catch(error){
        console.log(error);
    }
};