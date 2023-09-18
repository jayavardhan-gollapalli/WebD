var jwt = require('jsonwebtoken');
const JWT_SECRET="n@n!@jAY@";

const fetchuser=async (req,res,next)=>{
    console.log("Fetching user");
    let token= req.header('auth-token');
    console.log(token);
    if(!token){
        req.body.success=false;
        req.body.error= "No auth token";
        next();
        return;
    }
    try {
        let data= await jwt.verify(token, JWT_SECRET);
        console.log(data);
        req.body.success=true;
        req.body.id= data.id;
        req.body.name= data.name;
        req.body.email= data.email;
        next();
    } catch (error) {
        req.body.success=false;
        req.body.error=error;
        next();
    }
}

module.exports = fetchuser;