import React , {useContext, useRef} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../Context';

function SignedOutNav() {

  const registerref = useRef(null);
  const loginref = useRef(null);

  const focusOnRegister=()=>{
    registerref.current.className = "nav-link active";
    loginref.current.className="nav-link";
    }

  const focusOnLogin = ()=>{
    loginref.current.className = "nav-link active";
    registerref.current.className = "nav-link";
  }


    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">ExcerTracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to ="/login" className="nav-link active" ref={loginref} onClick={focusOnLogin}> Login </Link>
          </li>
          <li className="navbar-item">
          <Link to="/register" className="nav-link" ref = {registerref} onClick={focusOnRegister}> Register </Link>
          </li>

        </ul>
        </div>
      </nav>
      
    )
}


export default SignedOutNav
