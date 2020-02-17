import * as express from 'express';
import * as bodyparser from 'body-parser';
import {userRouter} from './router/user-router';
import {reimbursementRouter} from './router/reimbursement-router';

const app = express();

//Middleware
app.use('/',bodyparser.json());

//TODO Security
app.use('/',()=>{})

//Routes
app.use('/users',userRouter)
app.use('/reimbursements',reimbursementRouter)

// TODO Login
// Will use a JWT instead of session or cookie to store the result of authentication
// Reference:
app.post('/login',()=>{
});

// TODO Authorization

app.use('/',()=>{
  // Security
});

app.listen(2020,()=>{
  console.log('App has started on port 2020');
});