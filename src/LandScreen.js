import React from "react";
import './css/LandScreen.css';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";



export default function LandScreen(){
   
    
    
    

    let navigate = useNavigate();
    const navRegister = () =>{
    let path = '/Register'
    navigate(path, { replace: true })
    navigate(0);
     }

     const navLogin = () =>{
        let path = '/Login'
        navigate(path,{ replace: false })
     }
    
    return(
        <>
    <div class="float-container">

   <div class="float-child">
    <h1>Do you need help to manage your expenses?</h1>
    
   </div>
  
   <div class="float-child">
    <button onClick={navRegister}> Register</button>
    <button onClick={navLogin}> Login</button>
    
    <Routes>
        <Route path="/Register" element ={<Register/>}/>
        <Route path="/Login" element ={<Login/>} />
    </Routes>
    
    
    </div>
  
   </div>
        </>
    )
}