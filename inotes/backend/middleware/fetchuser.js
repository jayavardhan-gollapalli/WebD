var jwt = require('jsonwebtoken');
const JWT_SECRET="hellobhai#"

const fetchuser=async (req,res,next)=>{
    let token= req.header('auth-token');
    if(!token){
        res.send("Please use a valid authentication token");
    }
    try {
        let data= await jwt.verify(token, JWT_SECRET);
        req.user= data.user;
        // console.log(data);
        next();
    } catch (error) {
        res.send("Token is invalid");
    }
}

module.exports = fetchuser;