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
    res.json(users);
  }
  catch(e){
    next(e);
  }
});

// Find Users by ID
userRouter.get('/:id',authFactory([admin,financeManager]), authCheckId, async (req,res,next)=>{
  const id = +req.params.id;
  try{
    if(isNaN(id)){
      throw new BadCredentialsError;
    }
    const user = await findUserById(id);
    res.json(user);
  }
  catch(e){
    next(e);
  }
})



// Update User
userRouter.patch('/',authFactory([admin]), async (req,res,next)=>{
  const fields = {};
  Object.keys(req.body).filter(el=>el!=='id'&&el!=='token'&&el!=='user').map(el=>fields[el]=req.body[el]);
  if(Object.keys(fields).length===0||!req.body.id){
    throw new UserFieldsMissing;
  }
  try{
    let result = await updateUser(req.body.id,fields)
    res.status(200).json(result);
  }
  catch(e){
    next(e);
  }
})