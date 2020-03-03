import Role from "../models/Role"

export class UserDTO{
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  role_id: number
  name: string
  constructor(id:number,username:string,firstName:string,lastName:string,emailAddress:string,roleId:number,name:string){
    this.id=id;
    this.username=username;
    this.first_name=firstName;
    this.last_name=lastName;
    this.email=emailAddress;
    this.role_id=roleId;
    this.name=name;
  }
}