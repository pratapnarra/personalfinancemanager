import React from "react";
import Cookies from "universal-cookie";
import {Route, Navigate} from "react-router-dom";

const cookies = new Cookies();

export default function ProtectedRoutes({children}){
    return cookies.get("TOKEN") ?<>{children}</> : <Navigate to="/login"/>; 
    
}