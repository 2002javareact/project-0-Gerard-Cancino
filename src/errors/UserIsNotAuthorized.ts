import {HttpError} from './HttpError';

export class UserIsNotAuthorized extends HttpError{
  constructor(){
    super(403,'Your are unauthorized for this endpoint');
  }
}