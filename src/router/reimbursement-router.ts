import * as express from 'express';
import {reimbursements} from '../database';
import Reimbursements from '../models/Reimbursement';

export const reimbursementRouter = express.Router();

// Find Reimbursements by Status
reimbursementRouter.get('/status/:statusId',(req,res)=>{
  const statusId = +req.params.statusId;
  if(isNaN(statusId)){
    res.sendStatus(400);
  }
  else{
    let isFound = false;
    for(let reimbursement of reimbursements){
      if(reimbursement.statusId===statusId){
        isFound = true;
        res.send(200).json(reimbursement);
      }
    }
    if(!isFound){
      res.sendStatus(404);
    }
  }
});

// Find Reimbursements by User
reimbursementRouter.get('/author/userId/:userId',(req,res)=>{
  const userId = +req.params.userId;
  if(isNaN(userId)){
    res.sendStatus(400);
  }
  else{
    let isFound = false;
    for(let reimbursement of reimbursements){
      if(reimbursement.userId===userId){
        isFound=true;
        res.send(200).json(reimbursement);
      }
    }
    if(!isFound){
      res.sendStatus(404);
    }
  }
});

// Submit Reimbursements
reimbursementRouter.post('/',(req,res)=>{
  let {author,
    amount,
    dateSubmitted,
    dateResolved,
    description,
    resolver,
    status,
    type} = req.body;
  if(author&&amount&&dateSubmitted&&dateResolved&&description&&resolver&&status&&type){
    // TODO: Add SQL 
    reimbursements.push(new Reimbursements(author,amount,dateSubmitted,dateResolved,description,resolver,status,type));
    res.sendStatus(201);
  }
  else{
    res.status(400).send('Please include all reimbursement fields');
  }

});

// Update Reimbursements
reimbursementRouter.patch('/users',(req,res)=>{
  //TODO: Write the patch
});