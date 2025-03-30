import express, { Express, Response, Request } from 'express';

const msg: string = 'Hi, my first backend project';
console.log(msg);

const app: Express = express();
app.use(express.json());

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
  console.log('var userId',req.params.id);
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

//get a user by name
app.get('/users/name/:name', (req: Request, res: Response) => {
  const userName = req.params.name;
//  console.log('param name', req.params.name);

  const foundUserByName = users.find((user) => user.name === userName);
  //console.log('var user by name',foundUserByName);

  if (!foundUserByName) {
    res.status(404).send('User not found');
  }
  res.json(foundUserByName);
});

//deletes a user
app.get('/users/delete/:name', (req: Request, res: Response)=>{
  const userNameToDelete = req.params.name;
  const userDelete = users.filter((user)=> user.name != userNameToDelete
    );

  if(!userDelete){
    res.status(404).send("User not found");
    console.log('list after delete', userDelete);

  } res.json(userDelete);
})
