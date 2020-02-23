import {UserDidNotLoginError} from '../errors/UserDidNotLoginError';
import {UserIsNotAuthorized} from '../errors/UserIsNotAuthorized';
import { admin } from '../models/Role';

export const authFactory = (roles:string[])=>{
  return(req,res,next)=>{
    if(!req.session.user){
      throw new UserDidNotLoginError;
    }
    else if(roles.includes('Everyone')){
      next();
    }
    else{
      let allowed = false;
      for(let role of roles){
        if(req.session.user.role===role){
          allowed=true;
          next();
        }
      }
      if(!allowed){
        throw new UserIsNotAuthorized;
      }
    }
  }
}

export const authCheckId = (req,res,next) => {
  if(req.session.user.role === admin){
    next();
  }
  else if(req.session.user.id === +req.params.id){
    next();
  }
  else{
    throw new UserIsNotAuthorized;
  }
}