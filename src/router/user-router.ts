import * as express from 'express';
//import {User} from '../models/User';
import { BadCredentialsError } from '../errors/BadCredentialsError';
import { findUserById, findUsers, updateUser } from '../services/user-service';
import { authCheckId, authFactory } from '../middleware/auth-middleware';
import { financeManager, admin } from '../models/Role';
import { User } from '../models/User';
import { UserFieldsMissing } from '../errors/UserFieldIsMissing';

export const userRouter = express.Router() ;

// Find Users
userRouter.get('/',authFactory([admin,financeManager]), async (req,res,next)=>{ 
  try{
    const users:User[] = await findUsers();
    res.status(200).json(users);
  }
  catch(e){
    next(e);
  }
});

// Find Users by ID
userRouter.get('/:id', authCheckId([admin,financeManager]), async (req,res,next)=>{
  const id = +req.params.id;
  if(isNaN(id)){
    throw new BadCredentialsError;
  }
  else{
    try{
      const user:User = await findUserById(id);
      res.status(200).json(user);
    }
    catch(e){
      next(e);
    }
  }
})



// Update User
userRouter.patch('/',authFactory([admin]), async (req,res,next)=>{
  const fields = {};
  console.log(req.body)
  Object.keys(req.body).filter(el=>el!=='id'&&el!=='token'&&el!=='user'&&req.body[el]!=='').map(el=>fields[el]=req.body[el]);
  console.log(fields)
  if(Object.keys(fields).length===0||!req.body.id){
    throw new UserFieldsMissing;
  }
  try{
    let result:User = await updateUser(req.body.id,fields)
    res.status(200).json(result);
  }
  catch(e){
    next(e);
  }
})