//This file is about authentication of user.
const { request, response } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')  //bcrypt is used to hash the password

// router.get('/',(req,res)=>{
//     res.send("Hello Vishesh")
// })

router.post('/signup',(req, res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        return res.status(422).json({error:"Please fill all the fields!"})
    }
    // res.json({message:"Successfully sent."},

    //Below code is about finding that user email exist or not.
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"Email alreaddy exist!"})
        }
        bcrypt.hash(password,10)  //Here we will use bcrypt to hash our password. 10 is the length of the hash.
        .then(hashedpassword=>{   // Bigger the no. , secure the password 
            const user = new User({
                name,
                email,
                password:hashedpassword
                
            })
            user.save()
            .then(user=>{
                res.json({message:'saved successfully'})
            })
            .catch(err=>{
                console.log(err)
            })

        })


    })
    .catch(err=>{
        console.log(err)
    })

})

router.post('/signin',(req, res)=>{
    const {email,password} =req.body
    if(!email || !password){
        return res.status(422).json({error:"Please enter email and password!!"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Please enter valid email or password!!"})
        }
        bcrypt.compare(password, savedUser.password) //here we are comparing the password of user.
        .then(doMatch=>{                            //Here we will match the password. It is correct or not.
            if(doMatch){
                return res.status(422).json({message:"Successfull Sign-in."})
            }
            else{
                return res.status(422).json({error:"Please enter valid email or password!!"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
        
    })
})

module.exports = router