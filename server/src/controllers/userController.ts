import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { readFileSync } from 'fs';
import IUser from '../interfaces/userInterface.js';
import userService from '../services/userService.js';
import { error } from 'console';

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
    try {
      const errors = validationResult(req);
      // console.log(errors);

      if (!errors.isEmpty()) {
        resp.status(422).json({ errors: errors.array() });
      }
      const createdUserWithToken = await userService.register(req.body);
      if (!createdUserWithToken) {
        resp.status(404).json('User already exists');
      }

      const { name, email, password } = req.body;

      // if (!validateEmail(email)) {
      //   resp.status(422).json({ errors: errors.array() });
      // }

      resp.status(201).send(createdUserWithToken);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Can't create a new user: ${error.message}`);
      }
    }
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
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);
      // const validLogin = users.find((user) => user.email === userEmail);

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
      // const pass = validLogin?.password;

      // if (!userEmail || userPass !== pass) {
      //   res.status(422).json({ errors: errors.array() });
      // }

      const foundUserWithToken = await userService.login(email, password);
      if (!foundUserWithToken) {
        res.status(404).json({ error: 'Failed login' });
        return;
      }
      res.status(200).json(foundUserWithToken);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Can't login a user:  ${error.message}`);
      }
      res.status(500).json("Can't create a user");
    }
  }
}

export default new UserController();
