import React, {useEffect, useState, useMemo} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Chart } from "react-google-charts";
import { NotificationManager} from 'react-notifications';
import {
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBCheckbox,
  MDBSwitch,
  MDBBtn,
  MDBSelect,
  MDBInputGroup,
  MDBInput
} from 'mdb-react-ui-kit';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete,TextField,InputAdornment, Grid } from "@mui/material";
import './css/Home.css'; 




export default function Home() {
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    console.log(token);
    const [message, setMessage] = useState("");

    const logout=()=>{
        cookies.remove("TOKEN", { path: "/" });
        window.location.href = "/";

    }

    useEffect(()=>{
        const configuration ={
    method: "get",
    url:"http://localhost:8080/auth-endpoint",
    headers:{
        Authorization: `Bearer ${token}`,
    },
   };

   axios(configuration)
   .then((res)=>{
    setMessage(res.data.message);
   })
   .catch((err)=>{
    err = new Error();
   });
}, []);


   const categories = ['Grocery','Transportation','Rent and Utilities','Personal Care'
                     ,'Food','Entertainment','Miscellaneous','Shopping' ];
   
   const [expense, setExpense] = useState("");
   const [type, setType] = React.useState("");;
   const [cost, setCost] = useState(0);
   const [date, setDate] = React.useState(null);

   //buget variables
   const [food, setFood] = useState(0);
   const [shopping, setShopping] = useState(0);
   const [grocery, setGrocery] = useState(0);
   const [transport, setTransport] = useState(0);
   const [rent, setRent] = useState(0);
   const [personal, setPersonal] = useState(0);
   const [entertainment, setEntertainment] = useState(0);
   const [miscellaneous, setMiscellaneous] = useState(0);
   const [datebuget, setDateBudget] = React.useState(null);
   const [budgetFormDisabled, setBudgetFormDisabled] = useState(false);
   

   const handleDateSubmit = (e) =>{
    e = e.toISOString();
    e = e.slice(0,10);
    setDate(e);

   }
   //add expense
   const handleSubmit = (e)=>{
    e.preventDefault();
    axios(configuration)
  .then((res)=>{
    console.log(res);
    NotificationManager.success('Expense Added', 'Success', 3000);
   })
  .catch((err)=>{console.log(err);
  NotificationManager.error('Please try later', 'Error', 3000);})

  setExpense("");
  setDate(null);
  setType("");
  setCost(0);
   }

   
   //expense configuration
   const configuration ={
    method: "post",
    url:"http://localhost:8080/addexpense",
    headers:{
        Authorization: `Bearer ${token}`,
    },
    data:{
      token,
      expense,
      type,
      cost,
      date
    }
  }

  const handleSetBudget =(e)=>{
    e.preventDefault();
    var da2 = new Date();
    da2 = da2.toISOString();
    da2 = da2.slice(0,10);
    setDateBudget(da2);
    setBudgetFormDisabled(true);

    

    axios(budget_config)
  .then((res)=>{
    console.log(res);
    NotificationManager.success('Budget has been set', 'Success', 3000);
   })
  .catch((err)=>{console.log(err);
  NotificationManager.error('Please try later', 'Error', 3000);})

  
   }

  //budget configuration
  const budget_config={
    method:"post",
    url:"http://localhost:8080/setbudget",
    headers:{
        Authorization: `Bearer ${token}`,
    },
    data:{
      token,
      food,
      shopping,
      grocery,
      transport,
      rent,
      personal,
      entertainment,
      miscellaneous,
      datebuget
    }
  }
  
  const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];
const options = {
  title: "My Daily Activities",
  is3D: true,
};





    
    
  return (
    <div className="text-center" style={{justifyContent:'center', width:'100%'}}>
      
      <h1 className="text-center">Auth Component</h1>
      
      <h3 className="text-center text-danger">{message}</h3>
      <MDBBtn type="submit" variant="danger" onClick={()=>logout()}>Logout</MDBBtn>

      <Grid container spacing={6} style={{justifyContent:'center', width:'100%'}}>
        <Grid item xs={6} md={4} style={{marginRight:'20%'}}>
          <h1>Act now to rein your expenses</h1>
        
          <ul class='home-list' >
          <li><h2>1. Set a Budget</h2></li>
          <li><h2>2. Add Expenses</h2></li>
          <li><h2>3. Monitor</h2></li>
          </ul>
        </Grid>

        <Grid item xs = {6} md={4}>
          <MDBCardImage src='https://img.freepik.com/free-vector/reading-list-concept-illustration_114360-1090.jpg?w=2500&t=st=1682644720~exp=1682645320~hmac=174354a17e9e650ee47e3ede022d567cbb1122f10f48d516137715bff9b4a786' fluid/>

        </Grid>
      </Grid>
      
      <h1>Savings start with budgeting</h1>
      <Grid container spacing={6} style={{justifyContent:'center', width:'100%'}}>
        
        <Grid item xs={6} md={4} sm={10}style={{marginRight:'20%'}}>
          <MDBCardImage src='https://img.freepik.com/free-vector/online-payment-account-credit-card-details-personal-information-financial-transaction-cartoon-character-bank-worker-internet-banking_335657-2379.jpg?w=1380&t=st=1682645094~exp=1682645694~hmac=5cf2fb3befa37116298a481451863c06e025b1b19a233473f36f1badb58cac95' fluid/>

        </Grid>  
        
      <Grid item xs={6} md={4} style={{paddingTop:'8%'}}>
      <Grid container spacing={2} alignItems="center" >
      <Grid item xs={6} sm={3}>
        <label class='budget-label'>Food:</label>
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField  variant="outlined" 
        value ={food}
        onChange = {(e)=>setFood(e.target.value)}
        disabled={budgetFormDisabled}
        InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }} />
      </Grid>

      <Grid item xs={6} sm={3}>
        <label class='budget-label'>Shopping:</label>
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField  variant="outlined"
        value ={shopping}
        onChange = {(e)=>setShopping(e.target.value)}
        disabled={budgetFormDisabled}
        InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}  />
      </Grid>

      <Grid item xs={6} sm={3}>
        <label class='budget-label'>Grocery:</label>
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField variant="outlined" 
        value ={grocery}
        onChange = {(e)=>setGrocery(e.target.value)}
        disabled={budgetFormDisabled}
        InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }} />
      </Grid>

      <Grid item xs={6} sm={3}>
        <label class='budget-label'>Transport:</label>
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField  variant="outlined"
        value ={transport}
        onChange = {(e)=>setTransport(e.target.value)}
        disabled={budgetFormDisabled}
        InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}  />
      </Grid>

      <Grid item xs={6} sm={3}>
        <label class='budget-label'>Rent and Utilities:</label>
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField  variant="outlined"
        value ={rent}
        onChange = {(e)=>setRent(e.target.value)}
        disabled={budgetFormDisabled}
        InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}  />
      </Grid>

      <Grid item xs={6} sm={3}>
        <label class='budget-label'>Personal Care:</label>
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField  variant="outlined"
        value ={personal}
        onChange = {(e)=>setPersonal(e.target.value)}
        disabled={budgetFormDisabled}
        InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}  />
      </Grid>

      <Grid item xs={6} sm={3} >
        <label class='budget-label'>Entertainment:</label>
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField variant="outlined" 
        value ={entertainment}
        onChange = {(e)=>setEntertainment(e.target.value)}
        disabled={budgetFormDisabled}
        
        InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }} />
      </Grid>

      <Grid item xs={6} sm={3} >
        <label class='budget-label'>Miscellaneous:</label>
      </Grid>
      <Grid item xs={6} sm={3} >
        
        <TextField variant="outlined" 
        value ={miscellaneous}
        onChange = {(e)=>setMiscellaneous(e.target.value)}
        disabled={budgetFormDisabled}
        InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }} />
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'right' }} >
        <MDBBtn variant="contained" color="primary" type="submit" 
        onClick={(e)=>handleSetBudget(e)}>
          Set Budget
        </MDBBtn>
      </Grid>
    </Grid>
    </Grid>  

      </Grid>
      <h1>Add expenses</h1>
      

      <MDBRow tag='form' className='row-cols-lg-auto g-4 align-items-center' style={{justifyContent:'center'}}>
      <MDBCol size='12'>
        <TextField id="outlined-basic" label="Expense" variant="outlined" 
        value={expense} onChange={(e)=>setExpense(e.target.value)} />
      </MDBCol>
      <MDBCol size='12'>
       <Autocomplete
       value={type}
       onChange={(e,val)=>setType(val)}
       sx={{width:210}}
      disablePortal
      id="combo-box-demo"
      options={categories}
      
      renderInput={(params) => <TextField {...params} label="Category" />}
    />
      </MDBCol>
      <MDBCol size='12'>
        
       <TextField
          label="Cost"
          value ={cost}
          onChange = {(e)=>setCost(e.target.value)}
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </MDBCol>
      <MDBCol size='12'>
       <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <DatePicker format="YYYY-MM-DD" label='Date' value={date} onChange={handleDateSubmit} />
    </LocalizationProvider>
      </MDBCol>
      <MDBCol size='12'>
        <MDBBtn type='submit' onClick={(e)=>handleSubmit(e)}>Submit</MDBBtn>
      </MDBCol>
    </MDBRow>

    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}/>
      
    </div>
  );
}