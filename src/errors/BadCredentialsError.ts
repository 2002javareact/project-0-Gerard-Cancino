import {HttpError} from './HttpError';

export class BadCredentialsError extends HttpError{
  constructor(){
    super(404,"Invalid Credentials ");
  }
}