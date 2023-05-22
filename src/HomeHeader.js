import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Cookies from "universal-cookie";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { MDBBtn } from 'mdb-react-ui-kit';



export default function HomeHeader() {
  const cookies = new Cookies();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  let navigate = useNavigate();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const logout=()=>{
        cookies.remove("TOKEN", { path: "/" });
        window.location.href = "/";

    }

    const navSetGoals = () =>{
    let path = '/SetGoals'
    navigate(path, { replace: true })
    navigate(0);
     }

      const navForum = () =>{
    let path = '/Forum'
    navigate(path, { replace: true })
    navigate(0);
     }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static">
        
        
        <Toolbar style={{justifyContent:'center', backgroundColor:'#3b71ca',}}>
            <MDBBtn style={{marginLeft:'20%', fontSize:'16px'}} 
            onClick={navSetGoals}>Set Goals</MDBBtn>
        <MDBBtn style={{marginLeft:'10%', fontSize:'16px'}} onClick={navForum}>Forms</MDBBtn>

          
          {auth && (
            <div style={{paddingLeft:'40%'}}>
              <IconButton
               style={{}}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
             
            </div>
          )}
           <MDBBtn style={{ fontSize:'16px'}} onClick={()=>logout()}  >Logout</MDBBtn>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
