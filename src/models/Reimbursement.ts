
// TODO set up 
export default class Reimbursement {
  reimbursementId: number;
  author: number;
  amount: number;
  dateSubmitted: number;
  dateResolved: number;
  description: string;
  status: number;
  resolver?: number; 
  type?: number;
  constructor(reimbursementId:number,author:number,amount:number,dateSubmitted:number,dateResolved:number,description:string,status:number,resolver?:number,type?:number){
    this.reimbursementId=reimbursementId;
    this.author=author;
    this.amount=amount;
    this.dateSubmitted=dateSubmitted;
    this.dateResolved=dateResolved;
    this.description=description;
    this.status=status;
    this.resolver=resolver;
    this.type=type;
  }
}