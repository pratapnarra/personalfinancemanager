import {React, useState} from "react";
import { Link } from "react-router-dom";
import { NotificationManager} from 'react-notifications';
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';

export default function Register(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [register, setRegister] =useState(false)

   const configuration ={
    method: "post",
    url:"http://localhost:8080/register",
    data:{
      name,
      email,
      password
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    axios(configuration)
  .then((res)=>{
    console.log(res);
    NotificationManager.success('Registration successful', 'Success', 3000);
    setRegister(true);
   
  })
  .catch((err)=>{console.log(err);
  NotificationManager.error('Please try later', 'Error', 3000);})
  // if (register)
    
  }

 

  

    return(
      
      <MDBContainer fluid className='w-100 h-100 p-5' style={{ backgroundColor: "#eee" }}>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Your Name' id='form1' type='text' value={name} onChange={(e)=>setName(e.target.value)} className='w-100'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput label='Your Email' id='form2' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='Password' id='form3' type='password'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput label='Repeat your password' id='form4' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </div>

              {/* <div className='mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div> */}

              <MDBBtn className='mb-4' size='lg' type="submit" onClick={(e)=>{handleSubmit(e)}}>Register</MDBBtn>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
        </form>
      </MDBCard>
      
      

    </MDBContainer>
    
    
    );
}