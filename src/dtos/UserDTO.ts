import Role from "../models/Role"

export class UserDTO{
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  role_id: number
  role_name: string
  constructor(userId:number,username:string,firstName:string,lastName:string,emailAddress:string,roleId:number,roleName:string){
    this.id=userId;
    this.username=username;
    this.first_name=firstName;
    this.last_name=lastName;
    this.email=emailAddress;
    this.role_id=roleId;
    this.role_name=roleName;
  }
}