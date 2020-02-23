import * as express from 'express';
import Reimbursements from '../models/Reimbursement';
import { authFactory, authCheckId } from '../middleware/auth-middleware';
import { financeManager, admin } from '../models/Role';
import { BadCredentialsError } from '../errors/BadCredentialsError';
import { ReimbursementFieldsMissing } from '../errors/ReimbursementFieldsMissing';
import { findReimbursementsByUserId, saveOneReimbursement } from '../services/reimbursement-service';
import { isNamedExports } from 'typescript';
import { daoFindReimbursementsByStatusId } from '../repositories/reimbursement-dao';

export const reimbursementRouter = express.Router();

// Find Reimbursements by Status
reimbursementRouter.get('/status/:statusId',authFactory([financeManager]), async (req,res,next)=>{
  const statusId = +req.params.statusId;
  try{
    if(isNaN(statusId)){
      throw new BadCredentialsError;
    }
    const result = await daoFindReimbursementsByStatusId(statusId);
    res.send(200).json(result);
  }
  catch(e){
    next(e);
  }
});

// Find Reimbursements by User
reimbursementRouter.get('/author/userId/:userId',authFactory([financeManager]), authCheckId, async (req,res,next)=>{
  const userId = +req.params.userId;
  try{
    if(isNaN(userId)){
      throw new BadCredentialsError;
    }
    const reimbursements = await findReimbursementsByUserId(userId);
    res.send(200).json(reimbursements);
  }
  catch(e){
    next(e);
  }
});

// Submit Reimbursements
reimbursementRouter.post('/',authFactory([admin]),(req,res,next)=>{
  let {author,
    amount,
    dateSubmitted,
    dateResolved,
    description,
    resolver,
    status,
    type} = req.body;
  try{
    if(author&&amount&&dateSubmitted&&dateResolved&&description&&resolver&&status&&type){
      const result = saveOneReimbursement(new Reimbursements(0,author,amount,dateSubmitted,dateResolved,description,resolver,status,type)); // TODO
      res.send(201).json(result);
    }
    else{
      throw ReimbursementFieldsMissing;
    }
  }
  catch(e){
    next(e);
  }


});

// Update Reimbursements
reimbursementRouter.patch('/users',(req,res)=>{
  //TODO: Write the patch
});