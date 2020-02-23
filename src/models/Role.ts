export const admin = 'Admin';
export const user = 'User';
export const financeManager = 'FinanceManage';

export default class Role {
  roleId: number;
  role: string; // TODO: make unique in services
  constructor(roleId:number,role:string){
    this.roleId=roleId;
    this.role=role;
  }
}