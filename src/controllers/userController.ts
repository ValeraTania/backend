import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { readFileSync } from 'fs';
import IUser from '../interfaces/userInterface.js';
import userService from '../services/userService.js';

let users: IUser[] = JSON.parse(readFileSync('./src/data/users.json', 'utf-8'));

class UserController {
  //get all users
  getUsers(req: Request, res: Response) {
    res.json(users);
  }

  //get user by id
  getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    console.log('var userId', req.params.id);
    const foundUser = users.find((user) => user.id === userId);

    if (!foundUser) {
      res.status(404).send('User not found');
    }
    res.json(foundUser);
  }

  // add user
  register = async (req: Request, resp: Response) => {
    const errors = validationResult(req);
    // console.log(errors);

    if (!errors.isEmpty()) {
      resp.status(422).json({ errors: errors.array() });
    }
    const createdUserWithToken = await userService.register(req.body);
    if (!errors.isEmpty()) {
      resp.status(400).json('User already exists');
    }

    const { name, email, password } = req.body;

    // if (!validateEmail(email)) {
    //   resp.status(422).json({ errors: errors.array() });
    // }

    resp.status(201).send(createdUserWithToken);
  };

  //get user by name
  getUserByName(req: Request, res: Response) {
    const userName = req.params.name;
    //  console.log('param name', req.params.name);
    const foundUserByName = users.find((user) => user.name === userName);

    //console.log('var user by name',foundUserByName);

    if (!foundUserByName) {
      res.status(404).send('User not found');
    }
    res.json(foundUserByName);
  }

  //deletes a user
  delete(req: Request, res: Response) {
    const userToDelete = req.params.id;
    const userDelete = users.filter((user) => user.id !== userToDelete);

    if (!userDelete) {
      res.status(404).send('User not found');
      console.log('list after delete', userDelete);
    }
    res.json(userDelete);
  }

  //login + validation of password
  login(req: Request, res: Response) {
    const { email: userEmail, password: userPass } = req.body;
    const errors = validationResult(req);
    const validLogin = users.find((user) => user.email === userEmail);
    const pass = validLogin?.password;

    if (!userEmail || userPass !== pass) {
      res.status(422).json({ errors: errors.array() });
    }

    res.status(200).send(validLogin);
  }
}

export default new UserController();
