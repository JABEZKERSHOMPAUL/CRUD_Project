const { default: mongoose } = require("mongoose");

const userSchema=mongoose.Schema({
    username:{type:String,require:true},
    mobile:{type:String},
    email:{type:String,require:true},
    password:{type:String,require:true}
    
})

const User=mongoose.model("CRUD-USER",userSchema)

module.exports = User;