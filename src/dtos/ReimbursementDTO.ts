
export class ReimbursementDTO{
  reimbursementId:number
  author:number // foreign key
  amount:number
  dateSubmitted:number
  dateResolved:number 
  description:string
  status:number
  resolver?:number // foreign key
  type?:number // foreign key
  constructor(reimbursementId:number,author:number,amount:number,dateSubmitted:number,dateResolved:number,description:string,status:number,resolve?:number,type?:number){
    this.reimbursementId=reimbursementId;
    this.author=author;
    this.amount=amount;
    this.dateSubmitted=dateSubmitted;
    this.dateResolved=dateResolved;
    this.description=description;
    this.status=status;
    this.resolver=resolve;
    this.type=type;
  }
}