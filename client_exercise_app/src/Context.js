import React, { Component } from 'react'


const UserContext = React.createContext();

 class Context extends Component {

   
  
    constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.loginChangeHandler = this.loginChangeHandler.bind(this);
   
  }

     state = {
        username : '',
        loading : true,
        password : '',
        access_token : '',
        refresh_token : '',
        error :'',
        exercises : [],
       
    };

    componentDidMount(){
    this.setState({loading : true});
    this.checkRefreshToken();
    // this.autologout();
  }

     warningTimer= null;
    //  logoutTimer= null;
 
      
    // autologout = ()=>{
    //   events.forEach(event =>{
    //         window.addEventListener(event, this.resetTimer);
    //   });

    //   this.setTimer();
    // };

    // setTimer = ()=>{
    //     this.warningTimer = setTimeout(this.warningMessage, 4*1000);
    //     this.logoutTimer = setTimeout(this.logoutUser, 12*1000);
      
    // }

    // logoutUser = ()=>{
    //   this.logout();
    // }

    // warningMessage = ()=>{
    // this.setWarning(true);

    // }

    // resetTimer = ()=>{
    //   clearTimeout(logoutTimer);
    //   clearTimeout(warningTimer);
    //   this.setWarning(false);
    //   this.setTimer();
    // }

    checkRefreshToken = async()=> {
    
      const result = await (await fetch('http://localhost:5000/api/auth/refresh_token', {
        method: 'POST',
        credentials: 'include', // Needed to include the cookie
        headers: {
          'Content-Type': 'application/json',
        }
      })).json();
       this.setState({
          access_token: result.access_token,
          });
          this.setState({
            loading : false
          })
       //console.log(this.state.access_token);
    }

  

    loginChangeHandler = (e)=>{
        
        this.setState({
            ...this.state,
            [e.target.name] : e.target.value,
        });

        //console.log(this.state)

    }

     login = async(e, props)=>{
         e.preventDefault();
        const result = await (await fetch('http://localhost:5000/api/auth/login',
        {
            method : 'POST',
            credentials : 'include',
            headers :
            {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                username : this.state.username,
                password : this.state.password  
            })

        })).json();

        if(result.access_token){
            this.setState({
                ...this.state,
                access_token : result.access_token
            });
           
            const { location } = props;
            const { state } = location;
            if (state && state.from) {
              props.history.replace(state.from);
          }
            // else go to home
          else {
          props.history.replace('/');
        }
    
    } else {
      this.setState({
        ...this.state,
         error : result.error
      });
    }
        
    }


    logout = async()=>{
      const result = await fetch('http://localhost:5000/api/auth/logout',
      {
        method : 'POST',
        credentials : 'include',
        headers:{
          'Content-type' : 'application/json'
        }
      });

      this.setState({
        access_token : ''
      });

    }

    getExercises = async()=>{
      
        const result = await(await fetch('http://localhost:5000/api/exercises/exercises',
           {
           method : 'GET',
           credentials : 'include',
               headers :
               {
                   'Content-Type' : 'application/json',
                   'auth-token' : this.state.access_token
               }
    
           })).json();
   
          if(result.error){
            this.setState({error :result.error});
           }
   
           else{
               this.setState({
                 exercises :result,
                 error : ''
               });
              
             
           }
   
          }
      
        deleteExercise = async(id) =>{
          const result = await(await fetch(`http://localhost:5000/api/exercises/${id}`,
          {
          method : 'DELETE',
          credentials : 'include',
              headers :
              {
                  'Content-Type' : 'application/json',
                  'auth-token' : this.state.access_token
              },
   
          })).json();
  
         if(result.error){
           this.setState({error :result.error});
          }
  
          else{
          let exercises_new = [...this.state.exercises];
          exercises_new = exercises_new.filter(exercise => exercise._id != id);

              this.setState({
                exercises : exercises_new,
                error : ''
              });
        }
      }

      createExercise = async(exercise , props)=>{
        console.log(exercise)
        const result = await(await fetch(`http://localhost:5000/api/exercises/create`,
        {
        method : 'POST',
        credentials : 'include',
            headers :
            {
                'Content-Type' : 'application/json',
                'auth-token' : this.state.access_token
            },
            body : JSON.stringify({
              description : exercise.description,
              duration : exercise.duration,
              date : exercise.date
            })
 
        })).json();

       if(result.error){
         this.setState({error : result.error});
         console.log(this.state.error)
        }

        else{
    
            this.setState({
              error : ''
            });
            window.location="/";
      }

      }

      updateExercise = async(exercise, id)=>{
        console.log(exercise)
        const result = await(await fetch(`http://localhost:5000/api/exercises/update/${id}`,
        {
        method : 'POST',
        credentials : 'include',
            headers :
            {
                'Content-Type' : 'application/json',
                'auth-token' : this.state.access_token
            },
            body : JSON.stringify({
              description : exercise.description,
              duration : exercise.duration,
              date : exercise.date
            })
 
        })).json();

       if(result.error){
         this.setState({error :result.error});
        }

        else{
    
            this.setState({
              error : ''
            });
        
            
            window.location = '/';
            
        
      }

      }



    render() {
        return (
            <UserContext.Provider value={{...this.state , login :this.login , 
            loginChangeHandler : this.loginChangeHandler , checkRefreshToken : this.checkRefreshToken ,
             logout : this.logout , getExercises : this.getExercises, deleteExercise : this.deleteExercise,
             createExercise:this.createExercise , updateExercise : this.updateExercise}}>
            {this.props.children}
            </UserContext.Provider>
        )
    }
}

const UserConsumer = UserContext.Consumer;
export  {UserContext, UserConsumer , Context}
