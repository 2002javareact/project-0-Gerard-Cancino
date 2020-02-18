import * as jwt from 'json-web-token';
import * as express from 'express';
import {users} from '../database';

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

securityRouter.post('/login',(req,res)=>{
  let currentUser;
  for(let user of users){
    if(user.username===req.body.username&&user.password===req.body.password){
      currentUser=user;
    }
  }
  if(currentUser){
    console.log(currentUser)
    const payload={
      username:currentUser.username,
      role:currentUser.role
    }
    console.log(jwt.getAlgorithms())
    jwt.encode(key,payload,'HS256',(err,token)=>{
      if(err){
        console.log(err)
        // Prob a server error
        res.sendStatus(400);
      }
      else{
        res.cookie('auth',token);
        res.sendStatus(200);
      }
    })
  }
  else{
    res.sendStatus(404);
  }
});