import React, { useState } from 'react';
import axios from 'axios';
import { NotificationManager} from 'react-notifications';
import Cookies from 'universal-cookie';

import './css/Login.css'
import PropTypes from 'prop-types'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';



export default function Login({setUser}) {


    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loginsuccess, setLoginsuccess] = useState();

    const cookies = new Cookies();
    

    const configuration ={
    method: "post",
    url:"http://localhost:8080/login",
    data:{
      email,
      password
    }
  }


    const handleSubmit = async e =>{
        e.preventDefault();
        axios(configuration)
        .then((res)=>{
          console.log(res);
          NotificationManager.success('Login successful', 'Success', 3000);
          setLoginsuccess(true);
          cookies.set("uid",res.data.uid);
          cookies.set("TOKEN",res.data.token);
          window.location.href = "/home";

        })
        .catch((err)=>{console.log(err);
          NotificationManager.error('Incorrect Credentials', 'Error', 3000);
          setLoginsuccess(false);
        });
        // const user = await loginUser({username,password});
        // setUser(user);
        
    }

  return(
  <MDBContainer fluid className='w-100 h-100 p-5' style={{ backgroundColor: "#eee" }}>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput onChange={(e)=>{setEmail(e.target.value)}} label='Your Email' id='form2' type='email'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput onChange={(e)=>{setPassword(e.target.value)}}  label='Password' id='form3' type='password'/>
              </div>

              
              <MDBBtn className='mb-4' onClick={(e)=>handleSubmit(e)} size='lg'>Login</MDBBtn>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://img.freepik.com/free-vector/business-innovation-based-alternative-financial-services-digital-currency-market-exchange-financial-technology-flat-vector-illustration-fintech-startup-economy-finances-concept-banner_74855-22404.jpg?w=1800&t=st=1681146164~exp=1681146764~hmac=8fa54501e71f63527768452d7b8a15f8b268d5447445a7a5e934146396916e57' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>

       
       
        </form>
      </MDBCard>
      
      

    </MDBContainer>
  )
}

Login.propTypes = {
    setUser: PropTypes.func.isRequired
}