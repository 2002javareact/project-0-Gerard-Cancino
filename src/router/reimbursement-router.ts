import * as express from 'express';

export const reimbursementRouter = express.Router();

// Find Reimbursements by Status
reimbursementRouter.get('/status/:statusId',(req,res)=>{
});

// Find Reimbursements by User
reimbursementRouter.get('/author/userId/:userId',(req,res)=>{
});

// Submit Reimbursements
reimbursementRouter.post('/',(req,res)=>{
});

// Update Reimbursements
reimbursementRouter.patch('/users',(req,res)=>{
});