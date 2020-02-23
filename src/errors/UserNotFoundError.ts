import {HttpError} from './HttpError';

export class UserNotFoundError extends HttpError {
  constructor(){
    super(404,'User Not Found');
  }
}