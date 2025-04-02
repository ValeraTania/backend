import { readFileSync } from 'fs';
import { Router } from 'express';
import { check } from 'express-validator';
import IProduct from '../interfaces/productInterface.js';
import productController from '../controllers/productController.js';

const router = Router();
let products: IProduct[] = JSON.parse(readFileSync('./src/data/products.json', 'utf-8'));

//get all users
router.get('/products', productController.getAll);

//create a product
router.post('/products', productController.create);

export default router;
