import * as express from 'express';
import * as jwt from 'json-web-token';
import { findUserByUsernameAndPassword } from '../services/user-service';

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
  console.log('trying to login')
  // Validate date
  if(!username||!password) res.status(404).send('Please include username and password');
  else{
    try{
      const currentUser = await findUserByUsernameAndPassword(username,password);
      const payload={
        userId:currentUser.userId,
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



securityMiddleware.use('/',(req,res,next)=>{
  jwt.decode(key,req.body.token,(err,decodedPayload)=>{
    if(err){
      err.message="Your Token has expired"
    throw err;
    }
    else{
      req.body.user=decodedPayload;
      next();
    }
  })
})

securityMiddleware.get('/token',(req,res,next)=>{  
  jwt.decode(key,req.body.token,(err,decodedPayload)=>{
    if(err){
      err.message="Your Token has expired"
    throw err;
    }
    else{
      res.send(decodedPayload);
      next();
    }
  })
}) 