import {HttpError} from './HttpError';

export class TokenExpiredError extends HttpError{
  constructor(){
    super(401,'Token has expired')
  }
}