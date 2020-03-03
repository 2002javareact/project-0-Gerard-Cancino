import {HttpError} from './HttpError';

export class ReimbursementFieldsMissing extends HttpError {
  constructor(){
    super(400,'Please include all reimbursement fields');
  }
}