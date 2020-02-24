import {daoFindReimbursementsByStatusId,daoFindReimbursementsByUserId,daoSaveOneReimbursement, daoUpdateOneReimbursement } from "../repositories/reimbursement-dao";
import Reimbursement from "../models/Reimbursement";

export async function findReimbursementByStatusId(statusId:number):Promise<Reimbursement[]>{
  return await daoFindReimbursementsByStatusId(statusId);
}

export async function findReimbursementsByUserId(userId:number):Promise<Reimbursement[]>{
  return await daoFindReimbursementsByUserId(userId);
}

export async function saveOneReimbursement(reimbursement:Reimbursement):Promise<Reimbursement>{
  return await daoSaveOneReimbursement(reimbursement);
}

export async function updateOneReimbursement(reimbursementFields):Promise<Reimbursement>{
  return await daoUpdateOneReimbursement(reimbursementFields);
}