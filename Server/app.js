//Vishesh@1107-Mongodb
const express = require ('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI} = require('./keys') //the cluster that i have created in keys.js




//Now Connecting to our DB i.e. Mongodb
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log('Connected to mongo!')
})
mongoose.connection.on('error',(err)=>{
    console.log('error connencting to Mongo',err)
})
//Connection esatblished

require('./model/user')             // import user Schema 
require('./model/post')            // Import Post Schema 
app.use(express.json())           //Used to send the request.

app.use(require('./route/auth'))   //That is how we register route. Basically it imports auth.js file.
app.use(require('./route/post'))








//create own middleware

const customMiddleware = (req ,res, next)=>{
    console.log('Middleware Executed!')
    next()
}

//app.use(customMiddleware)

// app.get('/',(req , res)=> {
//     console.log('Home')
//     res.send('Hello World')
// })

// app.get('/about',customMiddleware,(req , res)=> {
//     console.log('About')
//     res.send('About Page')
// })


app.listen(PORT,()=>{
    console.log('The server is running on :', PORT)
})