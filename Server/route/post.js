const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model('Post')

router.get('/allpost',(req,res)=>{   //This line of code is about viewing all the posts
    Post.find()                     //Here we will find all the posts
    .populate('postedBy','_id name') //Populate is used to show content like id name password postedBy etc.
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/createpost',requireLogin,(req,res)=>{
    const {title, body} = req.body
    if (!title || !body){
        return res.status(422).json({error:"please fill all the fields."})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        postedBy: req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requireLogin,(req,res)=>{   //This line of code is about viewing all the posts
    Post.find({postedBy:req.user._id})                     //Here we will find all the posts
    .populate('postedBy','_id name') //Populate is used to show content like id name password postedBy etc.
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports = router
