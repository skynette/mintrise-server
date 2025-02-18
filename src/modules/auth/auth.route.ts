import { Router } from 'express';
import Controller from './auth.controller';
import {
  LoginToronetDTO,
  MintriseRegisterProjectToronetDTO,
  MintriseRegisterUserToronetDTO,
} from '@/dto/auth.dto';
import RequestValidator from '@/middlewares/request-validator';

const auth: Router = Router();
const controller = new Controller();

// /**
//  * Create user body
//  * @typedef {object} CreateUserBody
//  * @property {string} email.required - email of user
//  * @property {string} name.required - name of user
//  * @property {string} cognitoId.required - cognito id
//  * @property {string} phone - phone number
//  */
// /**
//  * login toronet body
//  * @typedef {object} LoginToronetBody
//  * @property {string} address.required - address of user
//  * @property {string} password.required - name of user
//  */
// /**
//  * User
//  * @typedef {object} User
//  * @property {string} email - email of user
//  * @property {string} name - name of user
//  * @property {string} cognitoId - cognito id
//  * @property {string} phone - phone number
//  */
// /**
//  * POST /users/create
//  * @summary Create user
//  * @tags users
//  * @param {CreateUserBody} request.body.required
//  * @return {User} 201 - user created
//  */
auth.post(
  '/login-toronet',
  RequestValidator.validate(LoginToronetDTO),
  controller.loginToronet
);
auth.post(
  '/mintrise-register-user-toronet',
  RequestValidator.validate(MintriseRegisterUserToronetDTO),
  controller.mintriseRigeterUserToronet
);
auth.post(
  '/mintrise-register-project-toronet',
  RequestValidator.validate(MintriseRegisterProjectToronetDTO),
  controller.mintriseRigeterProjectToronet
);

export default auth;
