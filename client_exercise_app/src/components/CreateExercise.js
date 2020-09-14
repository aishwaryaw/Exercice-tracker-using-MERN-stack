import React , {useState , useContext} from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {UserContext} from '../Context';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function CreateExercise(props) {

  const context = useContext(UserContext);
  const {  createExercise , error } = context; 
  
  const [exercise , setExercise ] =  useState({
    description : '',
    duration : 0,
    date : new Date()
  });

  const notify = ()=>{
    toast.error(error, {position : toast.POSITION.TOP_RIGHT});
    }


   if(error) {
    //    console.log(error);
       notify();
   }


  const changeHandler = (e)=>{
   
    setExercise({
      ...exercise,
      [e.target.name] : e.target.value
    });

  }
  const changeDate = (date) =>{
    setExercise({
      ...exercise,
      date : date
    })
  }
  const createexercise = (e, props)=>{
    e.preventDefault();
    console.log(exercise)
    createExercise(exercise , props); 
    
  }

  
    return (
        <div>
            <h1> CreateExercise </h1>
            <form>

            <div className="form-group">
            <label>Description : </label>
            <input className="form-control" type="text" name="description" onChange={changeHandler} />
            </div>

            <div className="form-group">
            <label>Duration(in minutes) : </label>
            <input className="form-control" type="text" name="duration" onChange={changeHandler}/>
            </div>

            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  dateFormat = "dd/MM/yyyy" 
                  // filterDate = {date => (date.getDay() !== 6 && date.getDay() !== 0)}
                  // minDate = {new Date()} 
                  // showMonthYearDropdown
                  // scrollableMonthYearDropdown
                  selected={exercise.date} 
                  name = "date"
                  onChange={changeDate}
                />
              </div>
            </div>

      <div className="form-group">
        <button type="submit" className="btn btn-primary" onClick={createexercise}>Create exercise</button>
      </div>
      {error ? <p>{error}</p> : null}
        </form>

        </div>
    )
}

export default CreateExercise
