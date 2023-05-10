const Student = require('../modal/student.modal')


const createStudent =async (req, res) => {
    try {

        const student = new Student({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            email: req.body.email,
            place:req.body.place,
            createdBy:req.userId
            
        })
        const createStudent = await student.save();
        if (createStudent) {
            res.json({ message: 'Created' });
        }

    } catch (error) {

        console.log(error)
    }
}

const getAllStudent=async (req,res)=>{
    try {
        const getAll=await Student.find({createdBy:req.userId})
        if(getAll){
            res.send(getAll)
        }
        
    } catch (error) {
        console.log(error)
        
    }
}

const getStudent = async(req,res)=>{
    try {
        
        const getstudentbyid = await Student.findById(req.params.id)
        if(getstudentbyid){
            res.send(getstudentbyid)
        }else{
            res.json({message:"Id not found"})
        }
    } catch (error) {
        console.log(error)
    }
}

const updateStudent =async(req,res)=>{
    try {
        const update =await Student.findByIdAndUpdate(req.params.id,req.body)
        if(update){
            res.json({message:'Updated'})
        }else{
            res.json({message:"Not updated"})
        }
    } catch (error) {
        console.log(error)
    }
   
}

const deleteStudent =async (req,res)=>{
    try {
        const deleteStudent = await Student.findByIdAndDelete(req.params.id)
        if(deleteStudent){
            res.json({
                message:"deleted"
            })
        }else{
            res.json({
                message:"not deleted"
            })
        }
    } catch (error) {
        
    }
}


module.exports = { createStudent,getAllStudent,getStudent,updateStudent,deleteStudent };                            