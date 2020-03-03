import Role from './Role';

export class User {
  userId: number;
  username: string;
  //password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role; // y not just reference??? 
  constructor(userId:number,username:string,firstName:string,lastName:string,email:string,role:Role){
    this.userId=userId;
    this.username=username;
    //this.password=password;
    this.firstName=firstName;
    this.lastName=lastName;
    this.email=email;
    this.role=role;
  }
}