import { User } from "../models/User";
import { connectionPool } from "./index";
import { PoolClient } from 'pg';
import { UserNotFoundError } from "../errors/UserNotFoundError";
import { userDTOToUserConverter } from "../utils/user-dto-to-user-converter";
import { InternalServerError } from "../errors/InternalServerError";

export async function daoFindUserById(userId:number):Promise<User>{
  let client:PoolClient;
  try{
    client = await connectionPool.connect();
    let result = await client.query('') // TODO query
    if(result.rowCount===0){
      throw new UserNotFoundError;
    }
    return userDTOToUserConverter(result.row[0]);
  }
  catch(e){
    throw new InternalServerError();
  }
}