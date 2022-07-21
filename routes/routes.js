const express = require('express')
const router = express.Router();
const User = require('../models/SignUpModel')
const bcrypt = require('bcrypt')
const signUpTemplateCopy = require('../models/SignUpModel')

router.post('/register' , async (req , res) =>{

   /* const {username , email , password} = req.body

    if(!(username , email,password)){
        res.status(400).json("All input required")
    }*/

    const saltRounds = 10
    const myPlainTextPassword = req.body.password
 
    const salt = bcrypt.genSaltSync(saltRounds)

    const hash = bcrypt.hashSync(myPlainTextPassword, salt);
    const userExists = await User.findOne({username : req.body.username})
   

    if(userExists){
        return res.status(400).send('username taken')
    }

    const emailExists = await User.findOne({email : req.body.email})
        if(emailExists){
        return res.status(400).send('email used already')
        }
    

    const signedUpUser = new signUpTemplateCopy({
        username : req.body.username,
        email : req.body.email,
        password : hash
    })
    signedUpUser.save().then (data =>{ 
        res.json(data)
        console.log('user created')
    }).catch(error =>{
        res.json(error)
    })


}
)

module.exports = router