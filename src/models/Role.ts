export const admin = 'admin';
export const user = 'user';
export const financeManager = 'finance-manage';

export default class Role {
  roleId: number;
  role: string; 
  constructor(roleId:number,role:string){
    this.roleId=roleId;
    this.role=role;
  }
}