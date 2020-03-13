import { TokenExpiredError } from './../errors/TokenExpiredError';
import { User } from './../../../project-1-Gerard-Cancino/src/models/User';
import { BadCredentialsError } from './../../../project-1-Gerard-Cancino/src/errors/BadCredentialsError';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { findUserByUsernameAndPassword, findUserById} from '../services/user-service';

export const securityMiddleware = express();
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

// TODO Authorization
securityMiddleware.post('/login', async (req,res)=>{
  // Get Data
  const {username,password} = req.body;
  // Validate date
  if(!username||!password) res.status(404).send('Please include username and password');
  else{
    try{
      const profile = await findUserByUsernameAndPassword(username,password);
      const payload={
        userId:profile.userId,
        username:profile.username,
        role:profile.role.role
      }
      // Previous: jwt.encode(key,payload,'HS256',(err,token)=>{
      jwt.sign(payload,key,{algorithm: 'HS256', expiresIn: "1h"},(err,token)=>{
        if(err){
          throw err;
        }
        else{
          req.session.token = token;
          res.status(200).json({token,profile});
        }
      })
    }
    catch(e) {
      throw e;
    }
  
  }
});



securityMiddleware.use('/',(req,res,next)=>{
  jwt.verify(req.headers.authorization,key,(err,decodedPayload)=>{
    if(err){
      throw new TokenExpiredError();
    }
    else{
      req.body.user=decodedPayload;
      next();
    }
  })
})
