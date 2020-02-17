import * as express from 'express';
import * as bodyparser from 'body-parser';
import {userRouter} from './router/user-router';
import {reimbursementRouter} from './router/reimbursement-router';

const app = express();

//Middleware
app.use('/',bodyparser.json());

//Routes
app.use('/users',userRouter)
app.use('/reimbursements',reimbursementRouter)

app.use('/login',()=>{
});

app.use('/',()=>{
  // Security
});

app.listen(2020,()=>{
  console.log('App has started on port 2020');
});