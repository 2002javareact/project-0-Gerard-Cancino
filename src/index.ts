import * as express from 'express';
import * as bodyparser from 'body-parser';
import {userRouter} from './router/user-router';
import {reimbursementRouter} from './router/reimbursement-router';
import {sessionMiddleware} from './middleware/session-middleware';
import {securityMiddleware} from './middleware/security-middleware';

const app = express();



//Middleware
app.use(bodyparser.json());
app.use(sessionMiddleware)


app.use(securityMiddleware)

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
