import express, { Express } from 'express';
import userRouter from "./routers/userRouter.js";

const msg: string = 'Hi, my first backend project';
console.log(msg);

const app: Express = express();
app.use(express.json());
app.use('/api', userRouter);
const port: number = 4005;

app.listen(port, () => {
  console.log(`server on port ${port}!!!`);
});
