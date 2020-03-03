import * as express from 'express';
import Reimbursements from '../models/Reimbursement';
import { authFactory, authCheckId } from '../middleware/auth-middleware';
import { financeManager, admin } from '../models/Role';
import { BadCredentialsError } from '../errors/BadCredentialsError';
import { ReimbursementFieldsMissing } from '../errors/ReimbursementFieldsMissing';
import { findReimbursementByStatusId, findReimbursementsByUserId, saveOneReimbursement, updateOneReimbursement } from '../services/reimbursement-service';
import { isNamedExports } from 'typescript';
import { ReimbursementDTO } from '../dtos/ReimbursementDTO';

export const reimbursementRouter = express.Router();

// Find Reimbursements by Status
reimbursementRouter.get('/status/:statusId',authFactory([admin,financeManager]), async (req,res,next)=>{
  const statusId = +req.params.statusId;
  try{
    if(isNaN(statusId)){
      throw new BadCredentialsError;
    }
    let result = await findReimbursementByStatusId(statusId);
    res.status(200).json(result);
  }
  catch(e){
    next(e);
  }
});

// Find Reimbursements by User
reimbursementRouter.get('/author/userId/:userId',authFactory([admin,financeManager]), authCheckId, async (req,res,next)=>{
  const userId = +req.params.userId;
  try{
    if(isNaN(userId)){
      throw new BadCredentialsError;
    }
    const reimbursements = await findReimbursementsByUserId(userId);
    res.status(200).json(reimbursements);
  }
  catch(e){
    next(e);
  }
});

// Submit Reimbursements
reimbursementRouter.post('/',authFactory([admin,financeManager]),async (req,res,next)=>{
  const {author_id,
    amount,
    date_submitted,
    date_resolved,
    description,
    resolver_id,
    status_id,
    type} = req.body;
  try{
    console.log(req.body)
    if(author_id&&amount&&date_submitted&&date_resolved&&description&&status_id){
      const result = await saveOneReimbursement(new ReimbursementDTO(0,author_id,amount,date_submitted,date_resolved,description,resolver_id,status_id,type));
      console.log(result)
      res.status(201).json(result);
    }
    else{
      throw new ReimbursementFieldsMissing;
    }
  }
  catch(e){
    next(e);
  }


});

// Update Reimbursements
reimbursementRouter.patch('/',authFactory([admin, financeManager]), async (req,res,next)=>{
  const fields = {};
  Object.keys(req.body).filter(el=>el!=='id'&&el!=='token'&&el!=='user').map(el=>fields[el]=req.body[el]);
  if(Object.keys(fields).length===0||!req.body.id){
    throw new ReimbursementFieldsMissing;
  }
  try{
    let result = await updateOneReimbursement(req.body.id,fields)
    res.status(200).json(result);
  }
  catch(e){
    next(e);
  }
});