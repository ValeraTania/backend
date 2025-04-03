import express, { Express } from 'express';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';

dotenv.config();
//console.log(process);
const PORT = process.env.PORT || 4000;

// const msg: string = 'Hi, my first backend project';
// console.log(msg);

const app: Express = express();
app.use(express.json());
app.use('/api', userRouter);
app.use('/prod', productRouter);

//const port: number = 4004

app.listen(PORT, () => {
  console.log(`server on port ${PORT}!!!`);
});
