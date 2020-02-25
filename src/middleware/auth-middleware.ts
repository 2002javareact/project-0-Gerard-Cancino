import {UserDidNotLoginError} from '../errors/UserDidNotLoginError';
import {UserIsNotAuthorized} from '../errors/UserIsNotAuthorized';
import { admin } from '../models/Role';
import { decode } from '../router/security-router'

export const authFactory = (roles:string[])=>{
  return(req,res,next)=>{
    if(!req.session.token){
      throw new UserDidNotLoginError;
    }
    else if(roles.includes('Everyone')){
      next();
    }
    else{
      let allowed = false;
      const user = decode(req.session.token);
      console.log(user)
      for(let role of roles){
        if(user.role===role){
          allowed=true;
          next();
        }
      }
      if(!allowed){
        throw new UserIsNotAuthorized;
      }
    }
    next();
  }
}

export const authCheckId = (req,res,next) => {
  // if(req.session.user.role === admin){
  //   next();
  // }
  // else if(req.session.user.id === +req.params.id){
  //   next();
  // }
  // else{
  //   throw new UserIsNotAuthorized;
  // }
  next();
}