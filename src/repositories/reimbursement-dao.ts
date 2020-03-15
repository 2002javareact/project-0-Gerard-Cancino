import {PoolClient} from 'pg';
import {connectionPool} from './index';
import { reimbursementDTOToReimbursementConverter } from '../utils/reimbursement-dto-to-reimbursement-converter';
import { InternalServerError } from '../errors/InternalServerError';
import Reimbursement from '../models/Reimbursement';
import { ReimbursementDTO } from '../dtos/ReimbursementDTO';

export async function daoFindReimbursementsByStatusId(statusId):Promise<Reimbursement[]>{
  let client:PoolClient;
  try{
    client=await connectionPool.connect();
    let result = await client.query('SELECT * FROM public.reimbursement WHERE status_id=$1',[statusId]);
    return result.rows.map(reimbursementDTOToReimbursementConverter);
  }
  catch(e){
    throw e;
  }
  finally{
    client && client.release();
  }
}

export async function daoFindReimbursementsByUserId(userId):Promise<Reimbursement[]>{
  let client:PoolClient;
  try{
    client=await connectionPool.connect();
    let result = await client.query('SELECT * FROM public.reimbursement WHERE author_id=$1',[userId]); 
    return result.rows.map(reimbursementDTOToReimbursementConverter);
    return []
  }
  catch(e){
    throw e;
  }
  finally{
    client && client.release();
  }
}

export async function daoSaveOneReimbursement(reimbursement:ReimbursementDTO):Promise<Reimbursement>{
  let client:PoolClient;
  try{
    console.log(reimbursement)
    client = await connectionPool.connect();
    let result = await client.query('INSERT INTO public.reimbursement (author_id,amount,date_submitted ,date_resolved ,description ,resolver_id,status_id ,"type") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id;', 
    [
        reimbursement.author_id,
        reimbursement.amount,
        reimbursement.date_submitted,
        reimbursement.date_resolved,
        reimbursement.description,
        reimbursement.resolver_id, 
        reimbursement.status_id,
        reimbursement.type
      ]
    );
    reimbursement.id=result.rows[0].id;
    return reimbursementDTOToReimbursementConverter(reimbursement);
  }
  catch(e){
    throw e;
  }
  finally{
    client && client.release(); 
  }
}

export async function daoUpdateOneReimbursement(id,reimbursementFields):Promise<Reimbursement>{
  let client:PoolClient;
  try{
    client = await connectionPool.connect();
    let fields = '';
    let i = 2;
    Object.keys(reimbursementFields).filter(key=>key==='author_id'||key==='amount'||key==='date_submitted'||key==='date_resolved'||key==='description'||key==='resolver_id'||key==='status_id'||key==='type').map(key=>fields+=`"${key}"=$${i++},`)
    fields=fields.substr(0,fields.length-1);
    let values = [];
    Object.keys(reimbursementFields).map(key=>values.push(reimbursementFields[key]))
    let result = await client.query(`update public.reimbursement as R set ${fields} where R.id = $1 RETURNING *;`,[id,...values]); // TODO Patch
    return reimbursementDTOToReimbursementConverter(result.rows[0]);
  }
  catch(e){
    throw e;
  }
  finally{
    client && client.release();
  }
}