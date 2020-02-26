
import * as express from 'express';
import {BadCredentialsError} from '../errors/BadCredentialsError';
import {findUserByUsernameAndPassword } from '../services/user-service';
import { UserIsNotAuthorized } from '../errors/UserIsNotAuthorized';
import { InternalServerError } from '../errors/InternalServerError';
import { admin } from '../models/Role';
import {authFactory} from '../middleware/auth-middleware';
import { UserDidNotLoginError } from '../errors/UserDidNotLoginError';

// TODO Login
// Will use a JWT instead of session or cookie to store the result of authentication
// Reference: https://medium.com/swlh/a-practical-guide-for-jwt-authentication-using-nodejs-and-express-d48369e7e6d4
/* MY NOTES:
  A JWT is split into 3 groups - Header, Payload, Signature
  Header: Stores info of the encryption. 
    What is the algorithm(alg)? HSA256 
    What is the type(typ)? JWT 
  // The tuturial went through buffers
  // Ref: https://www.freecodecamp.org/news/do-you-want-a-better-understanding-of-buffer-in-node-js-check-this-out-2e29de2968e8/
  // A buffer is a class to manipulate and interact with binary data.  It is considered the waiting period for data to be processed
*/
// Documentation for JWT https://www.npmjs.com/package/json-web-token
