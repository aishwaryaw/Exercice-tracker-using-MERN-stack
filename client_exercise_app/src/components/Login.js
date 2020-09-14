import React ,{useState , useContext } from 'react'
import {UserContext} from '../Context';
import SignedOutNav from './SignedOutNav';
import { Redirect } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

function Login(props) {

    const context = useContext(UserContext);

    const {  login , loginChangeHandler, error , access_token } = context;

    //console.log(access_token);
    
   

   const loginHandler = (e)=>{
       e.preventDefault();
       login(e,props);

   }

   const notify = ()=>{
    toast.error(error, {position : toast.POSITION.TOP_RIGHT});
    }


   if(error) {
    //    console.log(error);
       notify();
   }

  

    /* Here place request login api */

    // go to state.from if set before
    if(access_token) return <Redirect to="/" />
    
    return (
        <div>
            <SignedOutNav/>
            <form>

            <div className="form-group">
            <label>Username : </label>
            <input className="form-control" type = "text" name="username" required onChange={loginChangeHandler} />
            </div>

            <div className="form-group">
            <label>Password :</label>
            <input className="form-control" type="password" name = "password" required onChange = {loginChangeHandler} />
            </div>

            <button className="btn btn-primary" type="submit" onClick = {loginHandler} >Login </button>
  
            
            {/* {error ? <p className="font-red" >{error}</p> : null } */}
    
            
            
            </form>
        </div>
    )
}




export default Login
