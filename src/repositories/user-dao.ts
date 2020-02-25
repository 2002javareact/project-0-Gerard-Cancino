import { User } from "../models/User";
import { connectionPool } from "./index";
import { PoolClient } from 'pg';
import { UserNotFoundError } from "../errors/UserNotFoundError";
import { userDTOToUserConverter } from "../utils/user-dto-to-user-converter";
import { InternalServerError } from "../errors/InternalServerError";
import { UserFailedToLogin} from '../errors/UserFailedToLoginError';

export async function daoFindUsers():Promise<User[]>{
  let client:PoolClient;
  try{
    client=await connectionPool.connect();
    let result = await client.query('SELECT * FROM public.user as U JOIN public."role" as R on U.role_id = R.id; ');
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
    let result = await client.query('select * from public.user as U join public."role" on U.role_id="role".id where U.id=$1',[userId]) // TODO query
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
    let result = await client.query('SELECT * FROM public.user WHERE public.user.username=$1 and public.user.password=$2',[username,password]); 
    if(result.rows.length===0)
      throw new UserFailedToLogin;
    return userDTOToUserConverter(result.rows[0]);
  }
  catch(e){
    throw new InternalServerError;
  }
  finally{
    client && client.release();
  }
}