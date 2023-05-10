const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const student_router = require("./routes/Student_routes");
const User_router = require("./routes/user_routes");
const Movie_router=require("./routes/Movies_routes")

const PORT=8000;

const app=express()
app.use(express.json());

app.use(cors());

app.use('/',student_router);
app.use('/',User_router);
app.use('/',Movie_router)


const URI="mongodb+srv://Jabez:jabezkershom@cluster0.djujjbx.mongodb.net/"
mongoose.connect(URI).then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})  