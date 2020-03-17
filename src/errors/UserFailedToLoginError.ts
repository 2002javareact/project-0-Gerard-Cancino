import {HttpError} from './HttpError';

export class UserFailedToLogin extends HttpError{
  constructor(){
    super(401,'Username or Password was incorrect');
  }
}