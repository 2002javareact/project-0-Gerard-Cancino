import {HttpError} from './HttpError';

export class UserFailedToLogin extends HttpError{
  constructor(){
    super(400,'Username or Password was incorrect');
  }
}