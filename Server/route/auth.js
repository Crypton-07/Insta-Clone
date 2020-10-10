//This file is about authentication of user.
const { request, response } = require('express')
const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send("Hello")
})

router.post('/signup',(req, res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        return res.status(422).json({error:"Please fill all the fields!"})
    }
    res.json({message:"Successfully sent."})
})

module.exports = router