import React ,{useState, useContext} from 'react'
import {Redirect} from 'react-router-dom';
import SignedOutNav from './SignedOutNav';
import {UserContext} from '../Context';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Register(props) {

    const [user, setUser] = useState({
        username : '',
        password : ''
    });

    const context = useContext(UserContext);

    const {  access_token  } = context;

    const [error , setError] = useState('');

    const notify = ()=>{
        toast.error(error, {position : toast.POSITION.TOP_RIGHT});
        }
    
    
       if(error) {
        //    console.log(error);
           notify();
       }
    

    const changeHandler = (e)=>{
        setUser({
            ...user,
            [e.target.name] : e.target.value,
        });

    }

    const submitHandler = async (e)=>{
        e.preventDefault();
        const result = await (await fetch('http://localhost:5000/api/auth/register',
        {
            method : 'POST',
            credentials : 'include',
            headers :
            {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                username : user.username,
                password : user.password
            })

        })).json();

        if(result.error)
        {
            setError(result.error);
        }
        else
        {
        setError(null);
        props.history.push("/login");
        }

    }
if(access_token) return <Redirect to="/" />
    return (
        <div>
             <SignedOutNav/>
            <form>
                
            <div className="form-group">
            <label>Username : </label>
            <input className="form-control" type = "text" name="username" onChange={changeHandler} />
            </div>
            
            <div className="form-group">
            <label> Password : </label>
            <input  className="form-control"  type="password" name = "password" onChange = {changeHandler} />
            </div>
            <button type="submit" onClick = {submitHandler} >Register </button>
            {/* {error ? <p>{error}</p> : null} */}
            </form>
        </div>
    )
}

export default Register
