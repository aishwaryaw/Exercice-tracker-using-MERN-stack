import React , {useState , useContext , useEffect} from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {UserContext} from '../Context';
import { Redirect } from 'react-router-dom';
import {moment} from 'moment';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function UpdateExercise(props) {
   
  const context = useContext(UserContext);
  const id = props.match.params.id;
  const {  updateExercise , access_token , error } = context; 
  const [error1 , setError1] = useState('');
  const [click, setClick] = useState(false);
  const [exercise , setExercise ] =  useState({
    description : '',
    duration : 0,
    date : new Date()
  });


 useEffect(()=>{

  async function get(){
  const result = await (await fetch(`http://localhost:5000/api/exercises/${id}`,{
    method : 'GET',
    credentials :'include',
    headers : {
      'auth-token': access_token,
      'Content-type' : 'application/json' 
    }
 
  })).json();
 
  if(result == null){
     window.location="/";
  }
  if(result.error){
        setError1(result.error);
    }

    else{
        setExercise({
            description : result.description,
            duration: result.duration,
            date : new Date(result.date)
        })
    }
    
   }
   get();
   console.log(exercise)

 }, []);
 

    const notify = ()=>{
        toast.error(error, {position : toast.POSITION.TOP_RIGHT});
      }


      if(error && click) {
          notify();
          setClick(false);
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

  const updateexercise = (e)=>{
    e.preventDefault();
    setClick(true);
    updateExercise(exercise , id);
    console.log(error);
  }

if(error1 && !error) return <Redirect to="/" />
 
    return (
        <div>
            <h1> Update Exercise </h1>
            <form>

            <div className="form-group">
            <label>Description : </label>
            <input className="form-control" type="text" name="description" value={exercise.description} onChange={changeHandler} />
            </div>

            <div className="form-group">
            <label>Duration(in minutes) : </label>
            <input className="form-control" type="text" name="duration" value={exercise.duration} onChange={changeHandler}/>
            </div>

        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              // filterDate = {date => (date.getDay() !== 6 && date.getDay() !== 0)}
              // minDate = {new Date()}
              // showYearDropdown
              // scrollableYearDropdown
              dateFormat = "dd/MM/yyyy"
              selected={exercise.date} 
              name = "date"
              onChange={changeDate}
            />
          </div>
        </div>

      <div className="form-group">
        <button type="submit" className="btn btn-primary" onClick={updateexercise}>Update exercise</button>
      </div>
            </form>

        </div>
    )
}



export default UpdateExercise
