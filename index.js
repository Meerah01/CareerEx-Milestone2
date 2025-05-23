const express = require("express")
const mongoose = require("mongoose")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
// const Auth = require("./models/authModel")
// const Wallet = require("./models/walletModel")
const { handleForgotPassword, handleUserRegistration, handleUserLogin, handleResetPassword, handleMoneyTransfer, handleGetAllUsers } = require("./controllers")
const { validateRegister, adminAuthorization } = require("./middleware")
dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 1200

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log(`MongoDB connected...`)

    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
}) 


app.get("/", (req, res)=>{
    res.send("Welcome to FinTech payment system!")
})


// MILESTONE 1
// user registration
app.post("/register", validateRegister, handleUserRegistration) 

// user login
app.post("/login", handleUserLogin)



// MILESTONE 2
// password reset
app.post("/forgot-password", handleForgotPassword)

// updating password
app.patch("/reset-password", handleResetPassword)

// money transfer
app.post("/transfer-money", handleMoneyTransfer) 

// getting all registered users
app.get("/all-users", adminAuthorization, handleGetAllUsers)