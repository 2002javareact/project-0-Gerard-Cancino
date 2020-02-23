import Role from "../models/Role"

export class UserDTO{
  userId: number
  username: string
  firstName: string
  lastName: string
  emailAddress: string
  role: Role
  constructor(username:string,firstName:string,lastName:string,emailAddress:string,role:Role){
    this.username=username;
    this.firstName=firstName;
    this.lastName=lastName;
    this.emailAddress=emailAddress;
    this.role=role;
  }
}