import React, {useEffect, useState, useMemo} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Chart } from "react-google-charts";
import { NotificationManager} from 'react-notifications';
import { Link } from "react-router-dom";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
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
import { useNavigate } from 'react-router-dom';




export default function Home() {
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    console.log(token)
    const navigate = useNavigate();
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
    navigate('/login', { replace: true });
   });
}, []);


   const categories = ['grocery','transport','rent','personal'
                     ,'food','entertainment','miscellaneous','shopping' ];
   
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

   //chart variables
   var [piedata, setPieData] = useState();
   const [hasPieData, setHasPieData] = useState(false);
  //  const cats = { 'Food':1,'Shopping':2 ,'Grocery':3,'Transportation':4,'Rent and Utilities':5,'Personal Care':6
  //                    ,'Entertainment':7,'Miscellaneous':8}
   const cats = {1: 'food', 2: 'shopping', 3: 'grocery', 4: 'transport', 5: 'rent', 6: 'personal', 7: 'entertainment', 8: 'miscellaneous'}
                 
   const intbudget = [
    ["Category","Expense"],
    ["Food",0],
    ['Shopping',0],
    ['Grocery',0],
    ['Transportation',0],
    ['Rent and Utilities',0],
    ['Personal Care',0],
    ['Entertainment',0],
    ['Miscellaneous',0]
  ]                  
   const [actualBudget, setActualBudget] = useState(intbudget); 
   const [usedBudget, setUsedBudget] = useState(intbudget);
   const [expensesObj, setExpensesObj] = useState({});
   const [hasBarData, setHasBarData] = useState(false);
   const [dailyExp, setDailyExp] = useState()
   const [hasCalData, setHasCalData] = useState(false);
   

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
    NotificationManager.success('Expense Added', 'Success', 3000);
   })
  .catch((err)=>{console.log(err);
  NotificationManager.error('Please try later', 'Error', 3000);})

  setExpense("");
  setDate(null);
  setType("");
  setCost(0);
   }

   const  updateCharts = (e)=>{
    // const expensesobj = {"":0}
    e.preventDefault();
    const configuration ={
    method: "post",
    url:"http://localhost:8080/aggregateexpenses",
    headers:{
        Authorization: `Bearer ${token}`,
    },
    data:{
      token,
    }
  }
  axios(configuration)
  .then((res)=>{
    const arr = [];
    const newexpobj = {};

    for (let i = 0; i < res.data.result.length; i++) {
      arr.push([res.data.result[i]._id,res.data.result[i].totalCost]);
      var key1 = res.data.result[i]._id;
      var val1 = res.data.result[i].totalCost
      newexpobj[key1] = val1;
 }

    arr.sort();
    
    if(newexpobj){
     setExpensesObj(newexpobj);
     setHasBarData(true);
     }
    setPieData([["Category","Cost"],...arr]);
    setHasPieData(true)
    })
  .catch((err)=>{console.log(err);})


  //get the budget set by user
   const configuration_bud ={
    method: "post",
    url:"http://localhost:8080/userbudget",
    headers:{
        Authorization: `Bearer ${token}`,
    },
    data:{
      token,
    }
  }
  axios(configuration_bud)
  .then((res)=>{
    const newactualBudget = actualBudget.map((arr,i)=>{
      
      if (i==0)
        return arr;
        return [arr[0],res.data.budget[cats[i]]];
    });
    
    setActualBudget(newactualBudget);
});
  


  const configuration_dailyexp = {
    method: "post",
    url:"http://localhost:8080/dailyexpenditure",
    headers:{
        Authorization: `Bearer ${token}`,
    },
    data:{
      token
    }
    
  }

  axios(configuration_dailyexp)
  .then((res)=>{
    console.log(res.data)
     const arr2 = [[
    {
      type: "date",
      id: "Date",
    },
    {
      type: "number",
      id: "Expense",
    },
  ]];

    for (let i = 0; i < res.data.result.length; i++) {
      arr2.push([new Date(res.data.result[i]._id),res.data.result[i].totalCost]);
 }
  setDailyExp(arr2);
  setHasCalData(true);
  
  })
  .catch((err)=>{console.log(err)})

   }

   useEffect(() => {
    if(expensesObj){
      const newusedBudget = usedBudget.map((arr,i)=>{
    if (cats[i]  in expensesObj)
    return [arr[0],expensesObj[cats[i]]]; 
    return arr;
  });
  setUsedBudget(newusedBudget);
  }
  }, [expensesObj]);

  console.log(hasBarData);

  

   
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
  title: "Category wise expenses",
  is3D: true,
};

const renderPieChart = () =>{
  
  if(hasPieData){
    return  <Chart
      chartType="PieChart"
      data={piedata}
      options={options}
      width={"100%"}
      height={"400px"}/>
  } 
}

const diffdata = {
  old: actualBudget,
  new: usedBudget,
};

  const options2 = {
  legend: { position: "top" },
  diff: { newData: { widthFactor: 1 } }
};

const optionscal = {
  title: "Daily expenditure",
};

const renderBarChart = () =>{
  if(hasBarData){
    return <Chart
      chartType="ColumnChart"
      width="100%"
      height="400px"
      diffdata={diffdata}
      options={options2}
    />
  } 
}

const renderCalendarChart = () =>{
  if(hasCalData){
    return <Chart
      chartType="Calendar"
      width="100%"
      height="400px"
      data={dailyExp}
      options={optionscal}
    />
  }
}














    
    
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

    <MDBCol size='12'>
        <MDBBtn  onClick={(e)=>updateCharts(e)}>Update Charts</MDBBtn>
      </MDBCol>
      
    {renderPieChart()}
    <div style={{paddingleft:'20%'}}>
    {renderBarChart()}
    </div>
    
    <div style={{ width:'100%',justifyContent:'center',paddingLeft:'20%'}}>
      
       {renderCalendarChart()};
     
      
      </div>
    
    
      
    </div>
  );
}