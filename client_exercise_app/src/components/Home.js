import React , {useContext , useEffect, useState} from 'react'
import {UserContext} from '../Context';
import Exercise from '../components/Exercise';
function Home(props) {

    const context = useContext(UserContext);
    const {  exercises, getExercises } = context; 


    useEffect( ()=>{
    getExercises();
     } , []);



    if(exercises)
    {
    return (
    <div>
    <h3>Logged Exercises</h3>
   
    <div>
    <table className="table">
          <thead className="thead-light">
            <tr>
          
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
         
    {
    exercises && exercises.map((exercise,index) =>{
        return(
            <tbody key={index}>
             <Exercise exercise={exercise} />
            </tbody>
       
        )
        
    })
    }
      </table>
    </div>
    </div>

    )
    }

   
  
    return <h1>No exercises</h1>
    

}



export default Home
