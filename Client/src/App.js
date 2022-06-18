//use npm start

import React, {useState, useEffect} from "react";
import './App.css';
import Axios from "axios";

function App() { 
  const [patientName, set_patientName] = useState('');
  const [doctorName, set_DoctorName] = useState('');
  const [treatList, set_treatList] = useState([]);
  const [up_doc, set_up_doc] = useState('')

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((response)=>{
    set_treatList(response.data)
    })
  }, [])

  function submitData(){
    Axios.post("http://localhost:3001/api/insert", {
      patient_Name_client: patientName, 
      doctor_Name_client: doctorName
    })

    set_treatList([...treatList, {PNAME: patientName, DNAME: doctorName }])
  }

  const deleteData = (Pname)=> {
    Axios.delete(`http://localhost:3001/api/delete/${Pname}`);
  };

  const updateData = (Pname)=> {
    Axios.put("http://localhost:3001/api/update", {
      client_Pat_update: Pname,
      client_Doc_update: up_doc
    })
  };


  return (
    <div className="App">
      <h1 className='Header'>HOSPITAL MANAGEMENT</h1>
      <div className = "form">
        <label className="PatLab"><b>Patient Name</b></label>
        <input type = 'text' 
               className= "PatientName" 
               onChange={
                 (e)=> set_patientName(e.target.value)
               }></input>
        <label className="DocLab"><b>Doctor Name</b></label>
        <input type = 'text'
               className = "DoctorName"
               onChange={
                 (e)=> set_DoctorName(e.target.value)
               }></input>
      </div>
      <button className='SubmitButton' onClick={submitData}><b>Submit</b></button>
      <div className = "List">
        {treatList.map((value)=>{
          return(
           <div className = "treatment">
              <h3> PatientName : {value.PNAME} | DoctorName : {value.DNAME}</h3>
              <input type = "text" className = "UpdateText" onChange={(e)=>{set_up_doc(e.target.value)}}></input>
              <button className="UpButton" onClick={()=>{updateData(value.PNAME)}}>Update</button>
              <button className="DelButton" onClick={()=>{deleteData(value.PNAME)}}>Delete</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
