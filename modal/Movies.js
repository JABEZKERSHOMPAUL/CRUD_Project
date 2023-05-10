const mongoose = require('mongoose')

const moviesSchema = mongoose.Schema({
    moviename:{type:String,require:true},
    relesedate:{type:Number,require:true},
    directedby:{type:String,require:true},
    produced: {type:String,require:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId}

})

const MovieDetail = mongoose.model("CRUD-Movies", moviesSchema)

module.exports =MovieDetail ;