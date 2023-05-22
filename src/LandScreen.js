import React from "react";
import './css/LandScreen.css';
import { BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Wave from "./Wave";
import Header from "./Header";
import UserFeedback from "./LandScreenComponents/UserFeedback";
import { Container, Image } from "react-bootstrap";
import blobBgService from "../src/img/blob-bg-service.svg";
import Blob from "./LandScreenComponents/Blob";
import useBody from "./LandScreenComponents/useBody";





export default function LandScreen(){
   
    //let history = useHistory();
    


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
     useBody({
    background: "#eee",
  });
    
    return(
        <>
        <Container style={{ marginBottom: "3rem" }}>
        <Blob />
        <Blob />
        <Image
          src={blobBgService}
          className="position-absolute bg-services d-none d-lg-block"
          style={{ zIndex: -1 }}
        />

        <Header />
        <div style={{marginLeft:'0%', marginRight:'0%',width:'100%'}}>
       <Wave/>
        </div>
        
        <UserFeedback />
      </Container>

        
    
   
        </>
    )
}

