import { readFileSync } from 'fs';
import { Router } from 'express';
import { check } from 'express-validator';
import IProduct from '../interfaces/productInterface.js';
import productController from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
let products: IProduct[] = JSON.parse(readFileSync('./src/data/products.json', 'utf-8'));

//get all users
router.get('/products', productController.getAll);

//create a product
router.post('/products', productController.create);

//delete a product
router.delete('/products/:id',authMiddleware, productController.deleteProduct);

//get types of products
router.get('/products/types', productController.getTypes);

//get brands of products
router.get('/products/brands', productController.getBrands);

export default router;
