import { daoFindUserById, daoFindUsers, daoUpdateUser, daoFindUserByUsernameAndPassword } from "../repositories/user-dao";
import { User } from "../models/User";

export async function findUsers():Promise<User[]>{
  return await daoFindUsers();
}

export async function findUserById(id):Promise<User>{
  return await daoFindUserById(id);
}

export async function updateUser(updateFields):Promise<User>{
  return await daoUpdateUser(updateFields);
}

export async function findUserByUsernameAndPassword(username:string,password:string):Promise<User>{
  return await daoFindUserByUsernameAndPassword(username,password);
}

