import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as jwt from 'json-web-token';
import {userRouter} from './router/user-router';
import {reimbursementRouter} from './router/reimbursement-router';
import {sessionMiddleware} from './middleware/session-middleware';
import { findUserByUsernameAndPassword } from './services/user-service';
import { InternalServerError } from './errors/InternalServerError';

const app = express();
const key = 'NotForProduction';


//Middleware
app.use('/',bodyparser.json());
app.use(sessionMiddleware)

// TODO Authorization
app.post('/login', async (req,res)=>{
  // Get Data
  const {username,password} = req.body;
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


app.use('/',(req,res,next)=>{
  jwt.decode(key,req.body.token,(err,decodedPayload)=>{
    if(err){
      err.message="They password or username is incorrect"
      throw err;
    }
    else{
      req.body.user=decodedPayload;
      console.log(req.body.user)
      next();
    }
  })
})

//Routes
app.use('/users',userRouter)
app.use('/reimbursements',reimbursementRouter)





// Error Handler Catch All Router
app.use('/',(e,req,res,next)=>{
  console.error(e.stack);
  if(e.status<500){
      res.status(400||e.status).send(e.message);
  }
  else{
      res.status(500||e.status).send('Internal Server Error')
  }
})

app.listen(2030,()=>{
  console.log('App has started on port 2030');
});
