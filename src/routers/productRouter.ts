import express, { Response, Request } from "express";
import { readFileSync } from "fs";
import IProduct from "../interfaces/productInterface.js";
import { check, validationResult } from 'express-validator';
import { error } from 'console';

const productRouter = express.Router();
productRouter.use(express.json());
let products : IProduct[] = JSON.parse(readFileSync('/.src/data/products.json', 'utf-8')); 


//get products
productRouter.get('/products', (res: Response)=>{
    res.json(products);
})

//get product by ID
//create a product
//update product

//delete product (safe delete -> status inactive)

