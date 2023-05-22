import logo from './logo.svg';

import './css/App.css';
import {Switch, BrowserRouter, Route,Routes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import useUser from './useUser';
import LandScreen from './LandScreen';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import SetGoals from './SetGoals';
import Forum from './Forum';

// function setUser(userT){
//   sessionStorage.getItem('token',JSON.stringify(userT));

// }

// function getUser(){
//   const userString = sessionStorage.getItem('user');
//   const user = JSON.parse(userString);
//   return user?.token

// }

function App() {
  // const user = getUser();
  //const [user, setUser] = useState();
  

  // const {user, setUser} = useUser();
  // if(!user){
  //   return <Login setUser={setUser}/>

  // }
  // console.log("HII");
  // console.log(user);
  // console.log("HII");
  return (

    <>
    
     <Routes>
        <Route path='/' element={<LandScreen/>}></Route>
        <Route path="/Register" element ={<Register/>}/>
        <Route path="/Login" element ={<Login/>} />
        <Route path="/SetGoals" element ={<SetGoals/>}/>
        <Route path="/Forum" element={<Forum/>}/>
        <Route path="/Home" element={
          <ProtectedRoutes>
            <Home/>
          </ProtectedRoutes>
        }
        />
        {/* <ProtectedRoutes path='/Home' element ={<Home/>}/> */}
        
    </Routes>
    <NotificationContainer />
     
     
     
    </>
    

    
    
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
