import * as jwt from 'json-web-token';
import * as express from 'express';
import {users} from '../database';
import {BadCredentialsError} from '../errors/BadCredentialsError';

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
securityRouter.post('/login',(req,res)=>{
  // Get Data
  const {username,password} = req.body;
  // Validate date
  if(!username||!password) res.status(404).send('Please include username and password');
  else{
    try{
      const currentUser = findUsernameByUsernameAndPassword(username,password);
      const payload={
        username:currentUser.username,
        role:currentUser.role
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

securityRouter.get('/token',(req,res)=>{
  const {token} = req.body;
  if(!token) res.status(404).send('Mising token');
  else{
    jwt.decode(key,token,(err,decodedPayload)=>{
      if(err){
        res.status(404).send(err);
      }
      else{
        res.status(200).json(decodedPayload);
      }
    })
  }
})

function findUsernameByUsernameAndPassword(username:string, password:string){
  console.log(username + password)
  for(let user of users){
    if(user.username===username&&user.password===password) return user;
  }
  throw new BadCredentialsError();
}