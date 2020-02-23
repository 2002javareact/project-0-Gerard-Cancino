import { daoFindUserById } from "../repositories/user-dao";

export async function findUserById(id){
  return await daoFindUserById(id);
}