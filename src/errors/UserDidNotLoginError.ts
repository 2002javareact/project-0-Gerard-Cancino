import {HttpError} from './HttpError'

export class UserDidNotLoginError extends HttpError{
  constructor(){
    super(401,"Please Login")
  }
}