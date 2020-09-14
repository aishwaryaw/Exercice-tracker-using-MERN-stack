import React , {useContext , useEffect, useState} from 'react'
import {UserContext} from '../Context';
import {Link} from 'react-router-dom';
import moment from 'moment';

function Exercise({exercise}) {

 const {deleteExercise} =  useContext(UserContext);

  const deleteexercise = () =>{
    deleteExercise(exercise._id);
  }

    return (
        
          <tr>
            <td>{exercise.description}</td>
            <td>{exercise.duration}</td>
          
            <td>{moment(exercise.date).format('DD/MM/YYYY')}</td>
            <td>
            <Link to={`/update/${exercise._id}`}> Edit </Link> |
             <a href="" onClick={deleteexercise }> Delete </a>
            </td>
            </tr>
           
        
      
    )
}

export default Exercise
