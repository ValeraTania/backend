import { Request, Response } from 'express';
import IUser from '../interfaces/userInterface.js';
import jsonFileReader from '../utils/jsonFileReader.js';
import { v4 as uuidv4 } from 'uuid';
import tokenService from '../utils/tokenService.js';
const userFilePath = './src/data/users.json';

class userService {
  private read(): IUser[] {
    try {
      return jsonFileReader.read(userFilePath);
    } catch (error: unknown) {
      console.error(`Error reading users: ${error}`);
      throw new Error('Failed to read users');
    }
  }

  private write(users: IUser[]): void {
    try {
      jsonFileReader.write(userFilePath, users);
    } catch (error: unknown) {
      console.error(`Error writing users: ${error}`);
      throw new Error('Failed to write users');
    }
  }

  getAll = async () => {
    return this.read();
  };
  getById = async () => {};
  update = async () => {};
  delete = async () => {};
  
  register = async (newUser: IUser): Promise<{ user: IUser; accessToken: string }> => {
    try {
      const users: IUser[] = this.read();
      const foundUser = users.find((user) => user.id === newUser.id);

      newUser.id = uuidv4();
      users.push(newUser);
      this.write(users);
      const accessToken = tokenService.generateAccessToken(newUser);
      return { user: newUser, accessToken: accessToken };
    } catch (error: unknown) {
      console.error(`Error creating user ${error}`);
      throw new Error('Failed creating user');
    }
  };
}

export default new userService();
