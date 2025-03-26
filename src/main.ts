import express, { Express, Response, Request } from 'express';

const msg: string = 'Hi, my first backend project';
console.log(msg);

const app: Express = express();
app.use(express.json());

const port: number = 4001;
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

  if (!foundUser) {
    res.status(404).send('User not found');
  }
  res.json(foundUser);
});

app.post('/users', (req: Request, resp: Response) => {
  //   const name = req.body.name;
  //   const age = req.body.age;
  const { name, age } = req.body;

  const newUser: IUser = {
    id: 123,
    name: name,
  };
  
  users.push(newUser);
  console.log(name, age);
  resp.status(201).send(newUser);
});
