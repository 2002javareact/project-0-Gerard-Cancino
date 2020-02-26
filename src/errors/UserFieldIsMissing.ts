import {HttpError} from './HttpError';

export class UserFieldsMissing extends HttpError{
  constructor(){
    super(400,'User fields are missing');
  }
}