const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})
/*module.exports = mongoose.model('User',userSchema) -- Sometime it gives error that you have used 
it already in a file. You dont have to use it in other files. To prevent that eror the below codeline 
is used.*/

mongoose.model('User',userSchema)
    
