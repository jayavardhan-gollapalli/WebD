const express= require('express');
const router =express.Router();
const { body,validationResult } = require('express-validator');
const bcrypt= require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../models/User');
const fetchuser = require('../middleware/fetchUser');
const JWT_SECRET="n@n!@jAY@";

router.get('/createAccount',[
    body('name').isLength({min:5}),
    body('password').isLength({min:7}),
    body('email').isEmail(),
],async (req,res)=>{
    let error=await validationResult(body);
    if(error.length){
        res.send({success:false, error:error.array()})
        return;
    }

    let salt = await bcrypt.genSalt(10);
    let hashPass =await bcrypt.hash(req.body.password, salt);
    
    let user = await User.create({
        email:req.body.email,
        name:req.body.name,
        code: req.body.codename,
        password: hashPass
    })
    .then(()=>{res.send({success:true, message:["Account successfully created"]})})
    .catch((error)=>{res.send({success:false, error:error})})
})

router.post('/login',async (req,res)=>{
    let user= await User.findOne({email:req.body.email});
    if(!user)res.send({success:false,error:"No user with that email"});
    else{
        console.log(user);
        let compare= await bcrypt.compare(req.body.password,user.password);
        if(compare){
            let data= {
                id: user._id,
                email:user.email,
                name: user.name,
            }
            let authtoken= jwt.sign(data, JWT_SECRET);
            // localStorage.setItem('token',authtoken);
            res.send({success:true,data,authtoken});
            return
        }
        else {
            res.send({success:false,error:"Wrong password"});
        }
    }
})

router.post('/verify',fetchuser,async(req,res)=>{
    if(req.body.success){
        res.send(req.body);
        console.log("The verification passed")
        return;
    }
    res.send(req.body);
})

router.put('/update',fetchuser,async (req,res)=>{
    if(!user)res.send({success:false, message:["No user with that email"]});
    else{
        console.log(user);
        let compare= await bcrypt.compare(req.body.password,user.password);
        if(compare){
            let data= {
                id: user._id,
                email:user.email,
                name: user.name,
              }
            let authtoken= jwt.sign(data, JWT_SECRET);
            res.send({success:true, authtoken});
            return
        }
        else {
            res.send({success:false,error:["Wrong password"]});
        }
    }
})


module.exports = router;