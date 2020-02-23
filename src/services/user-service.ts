import { daoFindUserById, daoFindUsers, daoUpdateUser } from "../repositories/user-dao";

export async function findUsers(){
  return await daoFindUsers();
}

export async function findUserById(id){
  return await daoFindUserById(id);
}

export async function updateUser(reimbursementFields){
  return await daoUpdateUser(reimbursementFields);
}