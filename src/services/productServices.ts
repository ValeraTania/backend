import { Request, Response } from 'express';
import IProduct from '../interfaces/productInterface.js';
import jsonFileReader from '../utils/jsonFileReader.js';
import { v4 as uuidv4 } from 'uuid';
const productFilePath = './src/data/products.json';

class ProductService {
  private read(): IProduct[] {
    try {
      return jsonFileReader.read(productFilePath);
    } catch (error: unknown) {
      console.error(`Error reading products: ${error}`);
      throw new Error('Failed to read products');
    }
  }

  private write(products: IProduct[]): void {
    try {
      jsonFileReader.write(productFilePath, products);
    } catch (error: unknown) {
      console.error(`Error writing products: ${error}`);
      throw new Error('Failed to write products');
    }
  }

  getAll = async () => {
    return this.read();
  };
  getById = async () => {};
  update = async () => {};
  delete = async () => {};
  create = async (newProduct: IProduct): Promise<IProduct> => {
    try {
      const products: IProduct[] = this.read();
      newProduct.id = uuidv4();
      products.push(newProduct);
      this.write(products);
      return newProduct;
    } catch (error: unknown) {
      console.error(`Error creating product ${error}`);
      throw new Error('Failed creating product');
    }
  };
}

export default new ProductService();
