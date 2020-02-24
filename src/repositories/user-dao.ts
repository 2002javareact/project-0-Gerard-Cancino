import { User } from "../models/User";
import { connectionPool } from "./index";
import { PoolClient } from 'pg';
import { UserNotFoundError } from "../errors/UserNotFoundError";
import { userDTOToUserConverter } from "../utils/user-dto-to-user-converter";
import { InternalServerError } from "../errors/InternalServerError";

export async function daoFindUsers():Promise<User[]>{
  let client:PoolClient;
  try{
    client=await connectionPool.connect();
    let result = await client.query('SELECT * FROM public.USERS;')
    console.log(result)
    return result.rows.map(userDTOToUserConverter);
  }
  catch(e){
    throw new InternalServerError;
  }
  finally{
    client && client.release();
  }
}

export async function daoFindUserById(userId:number):Promise<User>{
  let client:PoolClient;
  try{
    client = await connectionPool.connect();
    let result = await client.query('SELECT * FROM reimbursement WHERE user_id=$1',[userId]) // TODO query
    if(result.rowCount===0){
      throw new UserNotFoundError;
    }
    return userDTOToUserConverter(result.rows[0]);
  }
  catch(e){
    throw new InternalServerError;
  }
  finally{
    client && client.release();
  }
}

export async function daoUpdateUser(userFields){
  let client:PoolClient;
  try{
    client = await connectionPool.connect();
    let result = await client.query(''); //TODO
    return userDTOToUserConverter(result.rows[0]);
  }
  catch(e){
    throw new InternalServerError;
  }
  finally{
    client && client.release();
  }
}

export async function daoFindUserByUsernameAndPassword(username:string,password:string){
  let client:PoolClient;
  try{
    client = await connectionPool.connect();
    let result = await client.query(''); // TODO
    return userDTOToUserConverter(result.rows[0])
  }
  catch(e){
    throw new InternalServerError;
  }
  finally{
    client && client.release();
  }
}