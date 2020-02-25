import * as jwt from 'json-web-token';
import * as express from 'express';
import {BadCredentialsError} from '../errors/BadCredentialsError';
import {findUserByUsernameAndPassword } from '../services/user-service';
import { UserIsNotAuthorized } from '../errors/UserIsNotAuthorized';
import { InternalServerError } from '../errors/InternalServerError';
import { authFactory } from '../middleware/auth-middleware';
import { admin } from '../models/Role';


export const securityRouter = express.Router() ;

const key = 'NotForProduction';

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
securityRouter.post('/login', authFactory([admin]), async (req,res)=>{
  // Get Data
  const {username,password} = req.body;
  // Validate date
  if(!username||!password) res.status(404).send('Please include username and password');
  else{
    try{
      const currentUser = await findUserByUsernameAndPassword(username,password);
      const payload={
        id:currentUser.userId,
        username:currentUser.username,
        role:currentUser.role.role
      }
      jwt.encode(key,payload,'HS256',(err,token)=>{
        if(err){
          throw err;
        }
        else{
          req.session.token = token;
          res.status(200).json(token);
        }
      })
    }
    catch(e) {
      throw e;
    }
  
  }
});

export function decode(token){
  if(!token) throw new UserIsNotAuthorized;
  else{
    let decodedValue = jwt.decode(key,token,(err,decodedPayload)=>{
      if(err){
        throw new InternalServerError;
      }
      else{
        return decodedPayload;
      }
    })
    return decodedValue;
  }
}