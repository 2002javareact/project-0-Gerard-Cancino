import Role from "../models/Role"

export class UserDTO{
  userId: number
  username: string
  firstName: string
  lastName: string
  emailAddress: string
  roleId: number
  roleName: string
  constructor(username:string,firstName:string,lastName:string,emailAddress:string,roleId:number,roleName:string){
    this.username=username;
    this.firstName=firstName;
    this.lastName=lastName;
    this.emailAddress=emailAddress;
    this.roleId=roleId;
    this.roleName=roleName;
  }
}