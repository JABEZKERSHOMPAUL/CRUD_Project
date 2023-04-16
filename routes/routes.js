const express= require('express')
const {createStudent} =require('../controller/student')

const router = express.Router();

router.route('/create/student').post(createStudent);
router.route('/get/all/student').get(getAllStudent);
router.route('/get/student/:id').get(getStudent);
router.route('/update/student/:id').put(updateStudent);
router.route('/delete/student/:id').delete(deleteStudent);


module.exports=router;