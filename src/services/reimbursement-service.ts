import {daoFindReimbursementsByStatusId,daoFindReimbursementsByUserId,daoSaveOneReimbursement, daoUpdateOneReimbursement } from "../repositories/reimbursement-dao";
import Reimbursement from "../models/Reimbursement";
import { ReimbursementDTO } from "../dtos/ReimbursementDTO";

export async function findReimbursementByStatusId(statusId:number):Promise<Reimbursement[]>{
  return await daoFindReimbursementsByStatusId(statusId);
}

export async function findReimbursementsByUserId(userId:number):Promise<Reimbursement[]>{
  return await daoFindReimbursementsByUserId(userId);
}

export async function saveOneReimbursement(reimbursement:ReimbursementDTO):Promise<Reimbursement>{
  return await daoSaveOneReimbursement(reimbursement);
}

export async function updateOneReimbursement(id,reimbursementFields):Promise<Reimbursement>{
  return await daoUpdateOneReimbursement(id,reimbursementFields);
}