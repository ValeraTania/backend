import express, { Response, Request } from 'express';
import { readFileSync } from 'fs';
import IUser from '../interfaces/userInterface.js';
import { check, validationResult } from 'express-validator';
import { error } from 'console';

const msg: string = 'Hi, my first backend project';
console.log(msg);

const router = express.Router();
router.use(express.json());

let users: IUser[] = JSON.parse(readFileSync('./src/data/users.json', 'utf-8'));

//get all users
router.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

//get user by id
router.get('/users/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  console.log('var userId', req.params.id);
  const foundUser = users.find((user) => user.id === userId);

  if (!foundUser) {
    res.status(404).send('User not found');
  }
  res.json(foundUser);
});

//validates email using regex
function validateEmail(email: string) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
}

//register new user
//middleware to validate user data
router.post(
  '/users/register',
  [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isStrongPassword().withMessage('Pass should be strong'),
    check('name').isLength({ min: 2, max: 100 }).withMessage('Name should have at least 2 characters'),
  ],
  (req: Request, resp: Response) => {
    //   const name = req.body.name;
    //   const age = req.body.age;
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      resp.status(422).json({ errors: errors.array() });
    }

    const foundUser = users.find((user) => user.email === email);
    if (foundUser) {
      resp.status(400).json('User already exists');
    }

    const { name, email, password } = req.body;

    if (!validateEmail(email)) {
      resp.status(422).json({ errors: errors.array() });
    }
    const newUser: IUser = {
      id: users.length + 1,
      name: name,
      email: email,
      password: password,
    };

    users.push(newUser);
    resp.status(201).send(newUser);
  },
);

//get a user by name
router.get('/users/name/:name', (req: Request, res: Response) => {
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
router.delete('/users/:id', (req: Request, res: Response) => {
  const userToDelete = parseInt(req.params.name);
  const userDelete = users.filter((user) => user.id !== userToDelete);

  if (!userDelete) {
    res.status(404).send('User not found');
    console.log('list after delete', userDelete);
  }
  res.json(userDelete);
});

//login + validation of password
router.post(
  '/users/login',
  [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isStrongPassword().withMessage('Invalid password'),
  ],
  (req: Request, res: Response) => {
    const { email: userEmail, password: userPass } = req.body;
    const errors = validationResult(req);
    const validLogin = users.find((user) => user.email === userEmail);
    const pass = validLogin?.password;

    if (!userEmail || userPass !== pass) {
      res.status(422).json({ errors: errors.array() });
    }

    res.status(200).send(validLogin);
  },
);

export default router;
