
const { empty } = require("php-in-js/cjs");
const user = require("../Models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const {generateTokenForUSer } = require('../Utils/token')

exports.adduser = async (req, res) => {
    try{
    const {
      name,
      surname,
      email,
      password  
    } = req.body;
  
    if (
      empty(name) ||
      empty(surname) ||
      empty(password) ||
      empty(email) )
     {
      return res.status(422).json({ error: "please enter all required fields" });
    }
    const minlength = 1;
  
    if (name.length <= minlength || surname.length <= minlength) {
      return res.status(422).json({
        error: `name or surname cannot be less than ${maxlength} characters long`,
      });
    }
  
    if (!validator.isEmail(email) || password.length < 8) {
      return res.status(422).json({ error: "invalid email & password must be morethan 8 characters long" });
    }
  
    const ifuserexist = await user.findOne({email:email});
    if (ifuserexist) {
      return res
        .status(422)
        .json({ error: "user already exist " });
    }
   
      const creat_user = await user.create({
        name: name,
        surname: surname,
        email: email,
        password: bcrypt.hashSync(password, 10),
        }, )
        if(!creat_user){
            return res.json({message:"error while creating user"})
        }
        return res.status(200).json({message:"user created successfully"})
      }catch(err){
        console.log(err);
      }
    }
      // login user

      exports.login = async (req, res) => {
        try {
          const { email, password,  } = req.body;
          if (empty(email)) {
            return res.status(422).json({ error: "enter registered email" });
          }
          const useremail = await user.findOne({
            email:email
          });
          if (!useremail) {
            return res
              .status(422)
              .json({ error: "user not found" });
          }
        const verify_password = bcrypt.compareSync(password, useremail.password)
            if (!verify_password) {
              return res.status(422).json({
                error: "invalid credentials",
              });
            }
            console.log(verify_password);
            return res
              .status(200)
              .json({ token: generateTokenForUSer(user._id) })
         
          } catch(err){
            console.log(err);
          }
        }
    