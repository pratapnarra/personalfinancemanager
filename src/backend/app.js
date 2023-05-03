const express = require('express');
const mongodbConnect = require('./db/mongodbConnect');
const cors = require('cors');
const app = express();
const port = 8080;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./db/userModel');
const Expense = require('./db/expensesModel');
const Budget = require('./db/budgetModel');
const crypto = require('crypto');
const auth = require("./auth");

mongodbConnect();
app.use(express.json());
app.use(cors());

app.post('/register', (request,response)=>{
    console.log("HIII")
    console.log(request.body)
    bcrypt.hash(request.body.password,10)
    .then((hashedpassword) =>{
        const id = crypto.randomBytes(16).toString("hex");
        const user = User({
            email: request.body.email,
            password: hashedpassword,
            uid: id
        });
        user.save()
        .then((result) =>{
            response.status(201).send({
                message:"User created successfully",
                result
            });
        })
        .catch((e)=>{
            response.status(500).send({
                message:"Error creating user",
                e
            })
        })
        
    }

    )
    
    .catch((e) => {
            response.status(500).send({
                message: 'Password was not hashed successfully',
            e})
        }
    )
})

app.post('/login',(req,res)=>{
    User.findOne({email: req.body.email})
    .then((user)=>{
        bcrypt.compare(req.body.password, user.password)
        .then((passCheck)=>{
            if(!passCheck) {
                return res.status(400).send({
                    message: "Passwords does not match",
                    error
                });
            }
            const token = jwt.sign(
                {
                    userId: user.uid,
                    userEmail: user.email,
                },
                "RANDOM-TOKEN",
                {expiresIn: "24h"}
            );

            res.status(200).send({
                message: "Login Successful",
                token,
            })
        })
        .catch((e)=>{
            res.status(400).send({
                message: "Passwords does not match",
                error,
            });
        })
    })
    .catch((e)=>{
        res.status(404).send({
            message: "Email not found",
            e
        });
    });
})

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint",auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});


//add an expense
app.post('/addexpense', auth, (request,response)=>{

    const {userId, useremail} = jwt.verify(request.body.token,'RANDOM-TOKEN')

    const expense = Expense({
        uid: userId,
        expense: request.body.expense,
        type: request.body.type,
        cost: request.body.cost,
        date: request.body.date
    })
    expense.save()
    .then((result)=>{
        response.status(201).send({
            message:"Expense added successfully"
        });
    })
    .catch((err)=>{
        response.status(500).send({
                message:"Error creating expense",
                err
            })
    })    
    
})

app.post('/setbudget', auth, (request,response)=>{

    const {userId, useremail} = jwt.verify(request.body.token,'RANDOM-TOKEN')

    const budget = Budget({
        uid: userId,
        food: request.body.food,
        shopping: request.body.shopping,
        grocery: request.body.grocery,
        transport: request.body.transport,
        rent: request.body.rent,
        personal:request.body.personal,
        entertainment:request.body.entertainment,
        miscellaneous: request.body.miscellaneous,
        date: request.body.date
    })
    budget.save()
    .then((result)=>{
        response.status(201).send({
            message:"Budget has been set successfully"
        });
    })
    .catch((err)=>{
        response.status(500).send({
                message:"Error setting budget",
                err
            })
    })    
    
})



app.listen({port}, () => console.log('API is running on http://localhost:8080/'));

module.exports = app;