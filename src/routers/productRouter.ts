import express, { Response, Request } from "express";
import { readFileSync } from "fs";
import IProduct from "../interfaces/productInterface.js";

const productRouter = express.Router();
let products : IProduct[] = JSON.parse(readFileSync('/.src/data/products.json', 'utf-8')); 