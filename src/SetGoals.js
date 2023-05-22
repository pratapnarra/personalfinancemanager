import HomeHeader from "./HomeHeader";
import { Autocomplete,TextField,InputAdornment, Grid } from "@mui/material";
import { useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";

export default function SetGoals(){
    const [saveGoal,setSaveGoal] = useState(0);
    const [income, setIncome]= useState(0);

    return(
        <div >
        <HomeHeader/>
        <h1 style={{paddingLeft:'35%'}}>Set Your Financial Goals</h1>

        
      
        <h2 style={{paddingLeft:'45%'}}>Saving</h2>
        <Grid container spacing={1} alignItems="center" style={{paddingTop:'5%', marginLeft:'10%'}}  >
      <Grid item xs={6} sm={3}>
        <label class='budget-label' >Set your savings goal:</label>
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField  variant="outlined" 
        value ={saveGoal}
        onChange = {(e)=>setSaveGoal(e.target.value)}
        InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }} />
      </Grid>

      <Grid item xs={6} sm={3}>
        <label class='budget-label'>Income:</label>
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField  variant="outlined"
        value ={income}
        onChange = {(e)=>setIncome(e.target.value)}
        InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}  />
      </Grid>
      </Grid>
      <MDBBtn style={{marginLeft:'45%', marginTop:'2%'}}>Submit</MDBBtn>
        <h2 style={{paddingLeft:'45%',marginTop:'5%'}}>Investing</h2>
        </div>
        
    )
}