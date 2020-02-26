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
    let result = await client.query('SELECT U.id,username,first_name,last_name,email,role_id,"name" FROM public.user as U JOIN public."role" as R on U.role_id = R.id; ');
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

export async function daoUpdateUser(id,userFields){
  let client:PoolClient;
  try{
    client = await connectionPool.connect();
    let fields = '';
    let i = 2;
    Object.keys(userFields).filter(key=>key==='password'||key==='first_name'||key==='last_name'||key==='email').map(key=>fields+=`"${key}"=$${i++},`)
    fields=fields.substr(0,fields.length-1);
    let values = [];
    Object.keys(userFields).map(key=>values.push(userFields[key]))
    let result = await client.query(`update public.user as U set ${fields} where U.id = $1 RETURNING *;`,[id,...values]);
    return userDTOToUserConverter(result.rows[0]);
  }
  catch(e){
    throw e;
  }
  finally{
    client && client.release();
  }
}

export async function daoFindUserByUsernameAndPassword(username:string,password:string){
  let client:PoolClient;
  try{
    client = await connectionPool.connect();
    let result = await client.query('SELECT * FROM public.user JOIN public.role on public.user.id=public.role.id WHERE public.user.username=$1 and public.user.password=$2',[username,password]); 
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