var jwt = require('jsonwebtoken');
const JWT_SECRET="n@n!@jAY@";

const fetchuser=async (req,res,next)=>{
    console.log("Fetching user");
    let token= req.header('auth-token');
    console.log(token);
    if(!token){
        req.body.user={is:false,error:{name:"JsonWebTokenError",message:"Token not present"}};
        // {
        //     "user": {
        //       "is": false,
        //       "error": {
        //         "name": "JsonWebTokenError",
        //         "message": "Token not present"
        //       }
        //     }
        //   }
        next();
        return;
    }
    try {
        let data= await jwt.verify(token, JWT_SECRET);
        console.log(data);
        req.body.user={is:true,data};
        // {
        //     "user": {
        //       "is": true,
        //       "data": {
        //         "id": "64feed7b4235b415a4366907",
        //         "email": "jaya@gmail.com",
        //         "name": "jayavardhan",
        //         "iat": 1695050932
        //       }
        //     }
        //   }
        next();
    } catch (error) {
        req.body.user={is:false,error};
        // {
        //     "user": {
        //       "is": false,
        //       "error": {
        //         "name": "JsonWebTokenError",
        //         "message": "invalid token"
        //       }
        //     }
        //   }
        next();
    }
}

module.exports = fetchuser;