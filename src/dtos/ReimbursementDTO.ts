
export class ReimbursementDTO{
  id:number
  author_id:number // foreign key
  amount:number
  date_submitted:number
  date_resolved:number 
  description:string
  status_id:number
  resolver_id?:number // foreign key
  type?:number // foreign key
  constructor(id:number,author_id:number,amount:number,date_submitted:number,date_resolved:number,description:string,status_id:number,resolver_id?:number,type?:number){
    this.id=id;
    this.author_id=author_id;
    this.amount=amount;
    this.date_submitted=date_submitted;
    this.date_resolved=date_resolved;
    this.description=description;
    this.status_id=status_id;
    this.resolver_id=resolver_id;
    this.type=type;
  }
}