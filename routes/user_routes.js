const express=require('express');
const { register, signIn } = require('../controller/user_controller');
const { verifyUser} = require('../Mallware/Auth');


const Router_user=express.Router();

Router_user.route('/create/register').post(register)
Router_user.route('/user/signin').post(signIn)
Router_user.route('/verify/user').post(verifyUser)

module.exports=Router_user