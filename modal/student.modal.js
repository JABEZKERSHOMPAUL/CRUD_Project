const mongoose=require('mongoose')

const studentSchema=mongoose.Schema({
    firstname:{type:String,require:true},
    lastname:{type:String,require:true},
    age:{type:Number,require:true},
    email:{type:String,require:true},
    place:{type:String,require:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId}
})

const Student=mongoose.model('CRUD-Students',studentSchema)

module.exports = Student;