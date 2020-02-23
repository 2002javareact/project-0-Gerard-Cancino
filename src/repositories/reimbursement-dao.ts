import {PoolClient} from 'pg';
import {connectionPool} from './index';
import { reimbursementDTOToReimbursementConverter } from '../utils/reimbursement-dto-to-reimbursement-converter';
import { InternalServerError } from '../errors/InternalServerError';
import Reimbursement from '../models/Reimbursement';

export async function daoFindReimbursementsByStatusId(statusId):Promise<Reimbursement>{
  let client:PoolClient;
  try{
    client=await connectionPool.connect();
    let result = await client.query('SELECT * FROM REIMBURSEMENT WHERE status_id=$1',[statusId]);
    return result.rows.map(reimbursementDTOToReimbursementConverter);
  }
  catch(e){
    throw new InternalServerError;
  }
  finally{
    client.release();
  }
}

export async function daoFindReimbursementsByUserId(userId):Promise<Reimbursement>{
  let client:PoolClient;
  try{
    client=await connectionPool.connect();
    let result = await client.query(''); //TODO
    return result.rows.map(reimbursementDTOToReimbursementConverter);
  }
  catch(e){
    throw new InternalServerError;
  }
  finally{
    client.release();
  }
}

export async function daoSaveOneReimbursement(reimbursement):Promise<Reimbursement>{
  let client:PoolClient;
  try{
    client = await connectionPool.connect();
    let result = await client.query('INSERT reimbursement VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [
        reimbursement.reimbursementId,
        reimbursement.author,
        reimbursement.amount,
        reimbursement.dateSubmitted,
        reimbursement.dateResolved,
        reimbursement.description,
        reimbursement.status,
        reimbursement.resolver, 
        reimbursement.type
      ]
    );
    return reimbursementDTOToReimbursementConverter(result.rows[0]);
  }
  catch(e){
    throw new InternalServerError;
  }
  finally{
    client.release(); 
  }
}