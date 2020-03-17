// we write the code the test our auth middleware

//mock request is an object constructor for fake request objects
const mockRequest = ()=>{
    //
    return {
        body:{
            user:{
                role:''
            }
        }
    }
}
// lets mack a mock response constructor as well
const mockResponse = () => {
    let res:any = {}
    res.status = jest.fn().mockReturnValue(res)// explicitly state what a function should return using a jest mock function
    res.send = jest.fn().mockReturnValue(res)
    return res;
}




import {authFactory} from './auth-middleware'
import { UserIsNotAuthorized } from '../errors/UserIsNotAuthorized'
// to build a suite of tests in jest 
// we use the word describe
describe('authFactory', ()=>{
    //this is where all the tests go
    let req;
    let res;
    let next;
    let string;

    beforeEach(()=>{
        req = mockRequest()
        res = mockResponse()
        next = jest.fn()
        string = []
    })
    // this will run a single test
    it('should allow an admin through', () =>{
        //set up test
        req.body.user.role = 'admin';
        string = ['admin','finance-manager','user'];
        //call the function
        authFactory(string)(req,res,next);
        // now we write some assertations
        expect(next).toBeCalled();
    })

    it('should not allow a non admin through', () =>{
        //set up test
        req.body.user.role = 'finance-manager';
        // string = ['admin']
        //call the function
        let auth = authFactory(string)
        // now we write some assertations
        //expect(next).not.toBeCalled();
        expect(auth).toThrow();
    })

    it('should not allow an un-logged in user', () =>{
        //set up test
        req.body.user = undefined
        string = ['admin','finance-manager','user']
        //call the function
        let auth = authFactory(string);
        // now we write some assertations
        expect(auth).toThrow();
    })

})

function authFactoryFinanceManager(){
    authFactory(['admin'])
}