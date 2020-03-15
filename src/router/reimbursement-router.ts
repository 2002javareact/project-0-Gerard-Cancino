import * as express from 'express';
import Reimbursement from '../models/Reimbursement';
import { authFactory, authCheckId } from '../middleware/auth-middleware';
import { financeManager, admin, user } from '../models/Role';
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
    let result:Reimbursement[] = await findReimbursementByStatusId(statusId);
    res.status(200).json(result);
  }
  catch(e){
    next(e);
  }
});

// Find Reimbursements by User
reimbursementRouter.get('/author/userId/:id',authCheckId([admin,financeManager]), async (req,res,next)=>{
  const userId = +req.params.id;
  try{
    if(isNaN(userId)){
      throw new BadCredentialsError;
    }
    const reimbursements:Reimbursement[] = await findReimbursementsByUserId(userId);
    res.status(200).json(reimbursements)
  }
  catch(e){
    next(e);
  }
});

// Submit Reimbursements
reimbursementRouter.post('/',authFactory([user]),async (req,res,next)=>{
  const date_submitted:number = new Date().valueOf();
  const date_resolved:number = 2696400000;
  const resolver_id:number=undefined;
  const status_id:number=1;
  const {author_id,
    amount,
    description,
    type} = req.body;
  try{if(author_id&&amount&&date_submitted&&date_resolved&&description&&status_id){
      const result:Reimbursement = await saveOneReimbursement(new ReimbursementDTO(0,author_id,amount,date_submitted,date_resolved,description,status_id,resolver_id,type))
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
    let result:Reimbursement = await updateOneReimbursement(req.body.id,fields)
    res.status(200).json(result);
  }
  catch(e){
    next(e);
  }
});