import { UserFailedToLogin } from './../errors/UserFailedToLoginError';
import {UserIsNotAuthorized} from '../errors/UserIsNotAuthorized';

export const authFactory = (roles:string[]) =>{
  return (req,res,next)=>{
    if(!req.body.user){
      throw new UserFailedToLogin();
    }
    else if(roles.includes('Everyone')){
      next();
    }
    else{
      let allowed = false;
      for(let role of roles){
        if(role===req.body.user.role){
          allowed=true;
          next();
        }
      }
      if(!allowed){
        throw new UserIsNotAuthorized();
      }
    }                                                                                                                                                                                                                                                       
  }
}

export const authCheckId = (roles:string[]) => {
  return(req,res,next)=>{
    if(!req.body.user){
      throw new UserIsNotAuthorized();
    }
    else if(roles.includes('Everyone') || req.body.user.userId===+req.params.id){
      next();
    }
    else {
      let allowed = false;
      for(let role of roles){
        if(role===req.body.user.role){
          allowed=true;
          next();
        }
      }
      if(!allowed){
        throw new UserIsNotAuthorized();
      }
    }
  }
}