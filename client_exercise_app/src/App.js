import React, {useState , useEffect ,  useContext} from 'react';
import './App.css';
import { Route , Switch } from 'react-router-dom';
import Home from './components/Home'
import Login  from './components/Login';
import Register from './components/Register';
import {ProtectedRoute} from './components/ProtectedRoute';
import {UserContext} from './Context';
import CreateExercice from './components/CreateExercise';
import UpdateExercise from './components/UpdateExercise';
import DeleteExercise from './components/Error';
import Error from './components/Error';
import Idletimer from './components/IdleTimer';
import {RingLoader} from 'react-spinners';
import {css} from '@emotion/core';

function App() {

    const context = useContext(UserContext);
    const { loading, logout , access_token } = context; 
    const loaderCss = css`
    margin : 20px auto;
    margin-top: 50px;
    height : 40px;
    width : 40px;
    `
    // const events = ['click', 'mousemove', 'mousedown', 'scroll', 'keypress' , 'load'];
    // let warningTimer = null;
    // let logoutTimer = null;
    // let loggedin = true;
    // const [ warning , setWarning ] = useState(false);

    // if((window.location.pathname=="/login") || (window.location.pathname =="/register")){
    //   loggedin = false
    // }
    // else{
    //   loggedin = true;
      
    // }
    // useEffect(() => {

    //   events.forEach(event =>{
    //         window.addEventListener(event, resetTimer);
    //   });
    
    //   setTimer();
       
    
    // }, []);

    // const setTimer = ()=>{
    //     warningTimer = setTimeout(warningMessage, 4*1000);
    //     logoutTimer = setTimeout(logoutUser, 12*1000);
      
    // }

    // const logoutUser = ()=>{
    //   logout();
    // }

    // const warningMessage = ()=>{
    //  setWarning(true);
    
    // }

    // const resetTimer = ()=>{
    //   clearTimeout(logoutTimer);
    //   clearTimeout(warningTimer);
    //   setWarning(false);
    //   loggedin = false;
    //   setTimer();
    // }

if (loading) return <RingLoader css={loaderCss} />

  return (

    <div className="App">

    {/* {(warning && loggedin) ? <div className="warning">u will be logged out </div>: null } */}

    {/* {access_token ? <Idletimer /> : null } */}

    <Switch>
    
    <Route exact path="/login" component = {Login} />
    <Route exact path="/register" component = {Register} />

    <ProtectedRoute exact path="/" component = {Home} />
    <ProtectedRoute exact path="/create" component={CreateExercice} />
    <ProtectedRoute exact path="/update/:id" component={UpdateExercise} />
    <ProtectedRoute exact path="/delete/:id" component={DeleteExercise} />
    <Route component={Error} />
     {/* <Route exact path="/" component={Home} /> */}
    </Switch>

    </div>
  );
}

export default App;
