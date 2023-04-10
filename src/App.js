import logo from './logo.svg';
import './css/App.css';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';
import useUser from './useUser';
import LandScreen from './LandScreen';

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
     <BrowserRouter>
     <LandScreen/>
     </BrowserRouter>
    

    
    
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
