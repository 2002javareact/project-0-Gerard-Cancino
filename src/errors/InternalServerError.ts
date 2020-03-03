import { HttpError } from "./HttpError";


export class InternalServerError extends HttpError{
  constructor(){
    super(500,'Internal Server Error');
  }
}