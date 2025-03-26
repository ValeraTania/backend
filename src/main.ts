import express, { Express, Response, Request } from 'express';

const msg: string = 'Hi, my first backend project';
console.log(msg);

const app: Express = express();
const port: number = 4000;
let users: IUser[] = [
  { id: 0, name: 'Alex' },
  { id: 1, name: 'Tania' },
  { id: 2, name: 'Alexandra' },
  { id: 3, name: 'Adriana' },
];

interface IUser {
  id: number;
  name: string;
}

app.listen(port, () => {
  console.log(`server on port ${port}!!!`);
});

//get all users
app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

//get user by id
app.get('/users/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const foundUser = users.find((user) => user.id === userId);
  res.json(foundUser);
});
