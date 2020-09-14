import React , {useContext , useEffect, useState} from 'react'
import {UserContext} from '../Context';
import {Route , Redirect } from 'react-router-dom';
import SignedInNav from './SignedInNav';

export const ProtectedRoute = ({component : Component , ...rest}) => {

    const context = useContext(UserContext);
    const { access_token } = context; 

    const [auth, setAuth] = useState('');
    
  
    useEffect(() => {

    async function isAuth() {   
    //console.log(access_token) 
     const result = await(await fetch('http://localhost:5000/api/auth/isAuth',
        {
        method : 'GET',
        credentials : 'include',
            headers :
            {
                'Content-Type' : 'application/json',
                'auth-token' : access_token
            }
 
        })).json();

         if(result.error){
             setAuth('false');
        }

        else{
            setAuth('true');
        }


   }
  
   isAuth();
   }, [access_token , auth] );



    return (
        <Route 
        {...rest}
        render = {props =>{
            //console.log(auth)
            if(auth && auth=='true'){
              
                return (
                <div>
                <SignedInNav />
                <Component {...props} />
                </div>
                )
            }

            else if(auth ==='false'){
                return(
            
                <Redirect to= {{
                    pathname : "/login",
                    state :{
                        from : props.location
                    }
                }}
                />
               
                )
            }
        }}
     
    />
    )
}


