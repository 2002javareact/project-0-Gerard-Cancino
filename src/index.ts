import * as express from 'express';
import * as bodyparser from 'body-parser';
import {userRouter} from './router/user-router';
import {reimbursementRouter} from './router/reimbursement-router';
import {sessionMiddleware} from './middleware/session-middleware';
import {securityMiddleware} from './middleware/security-middleware';
import { corsFilter } from './middleware/cors-filter-middleware';

const app = express();

app.use(corsFilter);

//Middleware
app.use(bodyparser.json());
app.use(sessionMiddleware)

//Security - Login - Decode
app.use(securityMiddleware)

//Routes
app.use('/reimbursements',reimbursementRouter)
app.use('/users',userRouter)

// Error Handler Catch All Router
app.use('/',(e,req,res,next)=>{
  console.error(e.stack);
  if(e.status<500){
      res.status(e.status).send(e.message);
  }
  else{
      res.status(404).send(e.message)
  }
})

app.listen(2030,()=>{
  console.log('App has started on port 2030');
});
