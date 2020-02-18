import * as express from 'express';
import {users} from '../database';
//import {User} from '../models/User';
import * as jwt from 'json-web-token';

export const userRouter = express.Router() ;

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



// Find Users
userRouter.get('/',(req,res)=>{ 
  res.json(users);
});

// Find Users by ID
userRouter.get('/:id',(req,res)=>{
  let isFound = false;
  for(let user of users){
    if(user.username === req.params.username){
      isFound=true;
      res.status(200).json(user);
    }
  }
  if(!isFound){
    res.sendStatus(404);
  }
})

// Update User
userRouter.patch('/',(req,res)=>{
  //TODO
})

