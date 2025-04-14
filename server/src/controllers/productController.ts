import { Request, Response } from 'express';
import IProduct from '../interfaces/productInterface.js';
import productService from '../services/productServices.js';
import fileUpload from 'express-fileupload';

class ProductController {
  getAll = async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 20, type = 'all', brand = 'all', query } = req.query;

      let products: IProduct[] = await productService.getAll();

      if (type && type !== 'all') {
        products = products.filter((product) => product.type === type);
      }

      if (brand && brand !== 'all') {
        products = products.filter((product) => product.brand === brand);
      }
      // console.log(products);

      //pagination
      const pageNumber = parseInt(page as string);
      const limitNumber = parseInt(limit as string);
      const startIndex = (pageNumber - 1) * limitNumber;
      const endIndex = pageNumber * limitNumber;

      products = products.slice(startIndex, endIndex);

      products = products.map((product) => ({
        ...product,
        image_url: `${req.protocol}://${req.get('host')}/${product.image_url}`,
      }));

      res.json(products);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Can't get all products ${error.message}`);
      }
      res.status(500).json({ error: 'Failed to get products' });
    }
  };

  getTypes = async (req: Request, res: Response) => {
    const products: IProduct[] = await productService.getAll();
    const types = products.map((product) => product.type);
    const uniqueTypes = [...new Set(types)];
    res.json(uniqueTypes);
  };

  getBrands = async (req: Request, res: Response) => {
    const products: IProduct[] = await productService.getAll();
    const brands = products.map((product) => product.brand);
    const uniqueBrands = [...new Set(brands)];
    res.json(uniqueBrands);
  };

  getById = async (req: Request, res: Response) => {};
  update = async (req: Request, res: Response) => {};

  deleteProduct = async (req: Request, res: Response) => {
    try {
      const products: IProduct[] = await productService.getAll();
      const productToDelete = req.params.id;
      // console.log(productToDelete);
      const deletedProduct = await productService.delete(productToDelete);

      if (!deletedProduct) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.json(deletedProduct);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Can't delete product with id ${req.params.id}: ${error.message}`);
      }
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const newProduct = req.body;
      const image = req.files?.image;
      const createdProduct = await productService.create(newProduct, image);
      res.status(201).json(createdProduct);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Can't create the products ${error.message}`);
      }
    }
  };
}

export default new ProductController();
