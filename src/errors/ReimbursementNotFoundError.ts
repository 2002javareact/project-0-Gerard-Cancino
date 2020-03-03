import {HttpError} from './HttpError';

export class ReimbursementError extends HttpError{
  constructor(){
    super(404,'Reimbursement note found')
  }
}