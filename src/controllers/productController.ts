import { Request, Response } from 'express';
import IProduct from '../interfaces/productInterface.js';
import productService from '../services/productServices.js';

class ProductController {
  getAll = async (req: Request, res: Response) => {
    try {
      const products: IProduct[] = await productService.getAll();
      res.json(products);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Can't get all products ${error.message}`);
      }
      res.status(500).json({ error: 'Failed to get products' });
    }
  };
  getById = async (req: Request, res: Response) => {
   
  };
  update = async (req: Request, res: Response) => {};
  delete = async (req: Request, res: Response) => {};
  create = async (req: Request, res: Response) => {
    try {
        const newProduct = req.body;
        const createdProduct = productService.create(newProduct);
        res.status(201).json(createdProduct);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(`Can't create the products ${error.message}`);
        }
      }
  };
}

export default new ProductController();
