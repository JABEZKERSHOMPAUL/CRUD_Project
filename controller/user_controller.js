const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const User = require('../modal/user_model');

const register = (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hashpassword) => {
    if (err) {
      res.json({ error: err });
    } console.log(req.body.email)
    let user = await User.findOne({ email: req.body.email });
    //email=await User.findOne({email}); console.log(email); console.log(req.body.email) // email:jabez@gmail.com
    if (user) {
      res.json({
        status: 0,
        message: 'Email Already Exist',
      });
    } else {
      login = new User({
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hashpassword,
      });
      await login.save().then((login) => {
        res.json({
          status:1,
          message: 'user added sucessfully',
        });
      })
        .catch((error) => {
          res.json({
            message: `an error occured------>${error}`,
          });
        });
    }
  });
};



const signIn = async (req, res) => {
  await User.findOne({ email: req.body.email }).then((login) => {
   
    if (login) {
      bcrypt.compare(req.body.password, login.password, (err, result) => {
        if (err) {
          res.json({ message: 'err' })
        }
        if (result) {
          let token = jwt.sign({ name: login.username, id: login._id }, 'key8088');
          res.json({status:1, message: 'Login Sucessfully', token })
        } else {
          res.json({ message: 'check email & password' })
        }
      })
    } else {
      res.json({ status:0,message: 'User Not Found' })
    }

  })
}




module.exports = { register, signIn }