import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import { error } from 'console';
import userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const msg: string = 'Hi, my first backend project';
console.log(msg);

const router = Router();
// const router = express.Router();
// router.use(express.json());

//get all users
router.get('/users',authMiddleware, userController.getUsers);

//get user by id
router.get('/users/:id', userController.getUserById);

//validates email using regex
// function validateEmail(email: string) {
//   return email.match(
//     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//   );
// }

//register new user
//middleware to validate user data
router.post(
  '/users/register',
  [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isStrongPassword().withMessage('Pass should be strong'),
    check('name').isLength({ min: 2, max: 100 }).withMessage('Name should have at least 2 characters'),
  ],
  userController.register,
  //   const name = req.body.name;
  //   const age = req.body.age;
);

//get a user by name
router.get('users/name/:name', userController.getUserByName);

//deletes a user
router.delete('users/:id', userController.delete);

//login + validation of password
router.post('users/login', [
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isStrongPassword().withMessage('Invalid password'),
]);

export default router;
