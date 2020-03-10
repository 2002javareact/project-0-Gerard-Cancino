import {UserDidNotLoginError} from '../errors/UserDidNotLoginError';
import {UserIsNotAuthorized} from '../errors/UserIsNotAuthorized';
import { admin } from '../models/Role';


// TODO: It says please login
export const authFactory = (roles:string[]) =>{
  return (req,res,next)=>{
    if(roles.includes('Everyone')){
      next();
    }
    else{
      let allowed = false;
      for(let role of roles){
        if(role===req.body.user.role)
          allowed=true;
      }
      if(!allowed){
        throw new UserIsNotAuthorized;
      }
      next();
    }                                                                                                                                                                                                                                                       
  }
}

export const authCheckId = (req,res,next) => {
  if(req.body.user.role === admin){
    next();
  }
  else if(req.body.user.id === +req.params.id){
    next();
  }
  else{
    throw new UserIsNotAuthorized;
  }
}