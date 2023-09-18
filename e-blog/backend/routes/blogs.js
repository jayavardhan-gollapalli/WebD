const express= require('express');
const router =express.Router();
const { body,validationResult } = require('express-validator');
const Blog = require('../models/Blog');
const fetchUser = require('../middleware/fetchUser');


router.get('/all',async (req,res)=>{
    let blogs=await Blog.find({public:true});
    // console.log(blogs);
    res.send(blogs);
})
router.get('/myBlogs',fetchUser,async (req,res)=>{
    let public=await Blog.find({user:req.body.user,public:true});
    let private=await Blog.find({public:false});
    // console.log(blogs);
    res.send({public,private});
})

router.post('/addBlog',[
    body('name').isLength({min:5}),
    body('tag').isLength({max:5}),
    body('description').isLength({min:50}),
    body('title').isLength({max:50,min:5}),
    body('email').isEmail()
],fetchUser,async (req,res)=>{
    // let {title,tag,description,content} = req.body;
    let success=true;
    let errors=await validationResult(req);
    console.log(errors);
    if(errors.length){
        success=false;
        let err= errors.array();
        let er= err.map((element)=>{
            return element.path;
        })
        console.log("Errors in the validation")
        res.send({success,errors:er});
        return;
    }
    try{
        console.log("body after fetching user",req.body);
        let {title,id,tags,description}=req.body;
        // body after fetching user {
        //     email: 'jaya@gmail.com',
        //     name: 'jayavardhan',
        //     user: 'nani',
        //     title: 'daadtahaf',
        //     description: 'fdallfdjajdfkadfajdfalkjfdkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkfdallfdjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkfdallfdjajdfkadfajdfkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
        //     author: 'Nanii',
        //     success: true,
        //     id: '64feed7b4235b415a4366907'
        //   }
        let blog= Blog({
            user:id,
            title,
            description,
            tags
        })
        blog.save();
        res.send({success:true,blog});
        return;
    }catch(e){
        success=false;
        console.log("Errors in saving")
        res.send({success,error:e})
        return;
    }
})
router.post('/makePublic',async (req,res)=>{
    // let {title,tag,description,content} = req.body;
    let success=true;
    let errors=await validationResult(req);
    if(errors.length){
        success=false;
        let err= errors.array();
        let er= err.map((element)=>{
            return element.path;
        })
        console.log("Errors in the validation")
        res.send({success,errors:er});
        return;
    }
    try{
        let blog = Blog(req.body);
        await blog.save();
        res.send({success,blog});
        return
    }catch(e){
        success=false;
        console.log("Errors in saving")
        res.send({success,error:["Some error occured"]})
        return;
    }
})



module.exports = router;