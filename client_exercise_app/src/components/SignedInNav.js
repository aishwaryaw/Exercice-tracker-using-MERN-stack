import React , {useContext}from 'react'
import {Route , Redirect , Link} from 'react-router-dom';
import {UserContext} from '../Context';

function SignedInNav() {
    const {logout} =  useContext(UserContext);

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">ExcerTracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
          <a href="" onClick ={logout} className="nav-link">Logout</a>
          </li>
       
        </ul>
        </div>
      </nav>
        
       
        
    )
}

export default SignedInNav
