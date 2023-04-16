const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const router = require("./routes/routes");

const PORT=8000;

const app=express()
app.use(express.json());

app.use(cors());

app.use('/', router);


const URI="mongodb+srv://Jabez:jabezkershom@cluster0.djujjbx.mongodb.net/"
mongoose.connect(URI).then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})