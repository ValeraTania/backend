import { Request, Response } from 'express';
import IProduct from '../interfaces/productInterface.js';
import jsonFileReader from '../utils/jsonFileReader.js';
import { v4 as uuidv4 } from 'uuid';
import productController from '../controllers/productController.js';
const productFilePath = './src/data/devices.json';
import fileUpload from '../utils/fileUpload.js';
import productModel from '../modules/productModel.js';

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

  getById = async (id: string) => {
    return await productModel.findById(id);
  };
  update = async (id: string, product:any) => {
    const updatedProduct = await productModel.findByIdAndUpdate(id,product, {new: true});
    if (!updatedProduct){
      throw new Error('Product not found');
    }
    return updatedProduct;
  };

  delete = async (id: string, token: any) => {
    // let products = this.read();

    // const foundProduct = products.find((product) => product.id === id);

    // if (!foundProduct) {
    //   return null;
    // }
    // if (foundProduct.image_url && foundProduct.image_url !== 'no-image.png') {
    //   await fileUpload.delete(foundProduct.image_url);
    // }
    // products = products.filter((product) => product.id !== id);
    // this.write(products);
    // return foundProduct;
   
    const productToDelete = await productModel.findByIdAndDelete(id,token);
    if(!productToDelete){
      throw Error("No product to delete");
      
    }
    if (productToDelete.image_url && productToDelete.image_url !== 'no-image.png') {
      await fileUpload.delete(productToDelete.image_url);
     }
    return productToDelete;
  };

  create = async (newProduct: IProduct, image: any): Promise<IProduct> => {
    try {
      newProduct.image_url = 'no-image.png';

      if (image) {
        newProduct.image_url = await fileUpload.save(image);
      }
      // const products: IProduct[] = this.read();
      // newProduct.id = uuidv4();
      // products.push(newProduct);
      // this.write(products);

      const createdProduct = await productModel.create(newProduct);

      return createdProduct;
    } catch (error: unknown) {
      console.error(`Error creating product ${error}`);
      throw new Error('Failed creating product');
    }
  };
}

export default new ProductService();
