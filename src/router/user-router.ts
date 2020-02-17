import * as express from 'express';
import {users} from '../database';
//import {User} from '../models/User';

export const userRouter = express.Router() ;

// Find Users
userRouter.get('/',(req,res)=>{ 
  res.json(users);
});

// Find Users by ID
userRouter.get('/:id',(req,res)=>{
  const id = +req.params.id;
  if(isNaN(id)){
    res.sendStatus(400);
  }
  else{
    let isFound = false;
    for(let user of users){
      if(user.id === id){
        isFound=true;
        res.status(200).json(user);
      }
    }
    if(!isFound){
      res.sendStatus(404);
    }
  }
})

// Update User
userRouter.patch('/',(req,res)=>{
  //TODO
})

