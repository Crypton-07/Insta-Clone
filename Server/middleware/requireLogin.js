module.exports = (req, res, next)=>{
    const {authorization} = req.headers
    
    //authorization == Bearer [token]
    if(!authorization){
        res.status(401).json({error:"You must have login!"})
    }
    authorization.replace("Bearer","")
}