import { Request, Response } from 'express';
import IProduct from '../interfaces/productInterface.js';
import jsonFileReader from '../utils/jsonFileReader.js';

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
  create = async () => {};
}

export default new ProductService();
