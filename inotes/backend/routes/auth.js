const express= require('express');
const User = require('../models/User');
const { body,validationResult } = require('express-validator');
const router =express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_SECRET="hellobhai#"
const fetchuser=require('../middleware/fetchuser')

//Creating Account
//express validator
// body(value, error if the value doesn't meet requirements).requirements
router.post('/createAccount',[ //this is the code of the validator 
    body('name','Name can\' be less than 5 characters').isLength({min:3}), 
    body('password',"Password can't be less than 5 characters").isLength({min:3}),
    body('email',"Not an email").isEmail() 
],async (req,res)=>{
    let error= validationResult(req);
    if(!error.isEmpty()){
        res.send(error);
        return; 
    }
    let user = await User.findOne({email:req.body.email});
    if(user){
        res.send("User is already registered");
        return;
    }
    const salt= await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password, salt);
    user =await User.create({
        name: req.body.name,
        password: secPass,
        email:req.body.email
    })
    res.json(user);
})

//Logging in
router.post('/login',[
    // body('name').isLength({min:5}),
    body('password').isLength({min:5}),
    body('email').isEmail()
],async (req,res)=>{
    let success=false;
    let error= await validationResult(req.body);
    if(!error.isEmpty){
        console.log(error);
        return;
    }
    try{
        let user=await User.findOne({email:req.body.email});
        if(!user){
            let message="User Not found"
            res.json({success,message});
            return;
        }
        console.log(user);
        let compare=await bcrypt.compare(req.body.password,user.password);
        if(!compare){
            let message="Invalid Creds"
            res.json({success,message});
            return;
        }

        let data={
            user:{
                id:user.id
            }
        }
        success=true;
        let authtoken= jwt.sign(data, JWT_SECRET);
        res.json({success,authtoken});
    }
    catch(error){
        console.log(error);
        res.send("Some error occured");
    }
})

router.post('/getuser',fetchuser,async (req,res)=>{
    try{
        let userId= req.user.id;
        let user= await User.findById(userId).select("-password");
        res.send(user);
    }catch(error){
        res.send("Some error occured")
    }
})

module.exports = router;