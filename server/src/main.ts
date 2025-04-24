// 

import express, { Express, Request, Response } from "express";

import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from "express-fileupload";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || '';

app.use(express.json());
app.use(fileUpload());
app.use(cors({
  origin: '*'
}))

app.use(express.static("static"));


app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'ok' })
})

app.use('/api', userRouter);
app.use('/prod', productRouter);




const startApp = async () => {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(MONGO_URI);
    console.log('Successfully connected to DB');

    app.listen(PORT, () => {
      console.log(`Server started on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to DB:', error)
  }
}

startApp();