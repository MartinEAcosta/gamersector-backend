import { Router } from 'express';
import { check } from 'express-validator';
import { createProduct } from '../controllers/ProductController';

const router = Router();

router.post(
    '/',
    [

    ],
    createProduct,
);



export default router;

