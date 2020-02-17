export default class Reinbursement {
  reinbursementId: number;
  author: number;
  amount: number;
  dateSubmitted: number;
  dateResolved: number;
  description: string;
  resolver: number;
  status: number;
  type: number;
  constructor(author,amount,dateSubmitted,dateResolved,description,resolver,status,type){
    this.author=author;
    this.amount=amount;
    this.dateSubmitted=dateSubmitted;
    this.dateResolved=dateResolved;
    this.description=description;
    this.resolver=resolver;
    this.status=status;
    this.type=type;
  }
}