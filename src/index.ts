import * as express from 'express';
import * as bodyparser from 'body-parser';
import {userRouter} from './router/user-router';
import {reimbursementRouter} from './router/reimbursement-router';
import {securityRouter} from './router/security-router';
import {sessionMiddleware} from './middleware/session-middleware';

const app = express();

//Middleware
app.use('/',bodyparser.json());
app.use(sessionMiddleware)

//TODO Security
app.use('/',securityRouter);

//Routes
app.use('/users',userRouter)
app.use('/reimbursements',reimbursementRouter)



// TODO Authorization

// app.use('/',()=>{
//   // Security
// });

app.listen(2030,()=>{
  console.log('App has started on port 2030');
});