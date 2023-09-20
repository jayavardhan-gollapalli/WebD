const express= require('express');
const router =express.Router();
const { body,validationResult } = require('express-validator');
const Blog = require('../models/Blog');
const fetchUser = require('../middleware/fetchUser');


router.get('/publicBlogs',async (req,res)=>{
    try{
        let data=await Blog.find({public:true}).lean();
        data.forEach((blog)=>{
            delete blog.user;
        })
        console.log(afdhadf);
        res.send({success:true,data});
        // {
        //     "success": true,
        //     "data": [
        //       {
        //         "_id": "65083706b7f02ea0cf4f066f",
        //         "title": "daadtahaf",
        //         "tag": [],
        //         "description": "fdallfdjajdfkadfajdfalkjfdkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkfdallfdjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkfdallfdjajdfkadfajdfkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
        //         "public": true,
        //         "author": "Anonymous",
        //         "date": "2023-09-18T11:39:50.097Z",
        //         "__v": 0
        //       }
        //     ]
        //   }
    }catch(e){
        res.send({success:false, error:e});
    }
})
router.get('/myBlogs',fetchUser,async (req,res)=>{
    let public=await Blog.find({user:req.body.user,public:true});
    let private=await Blog.find({public:false});
    // console.log(blogs);
    res.send({public,private});
})

//sends the blog details of the blog
router.get('/blog/:id',async(req,res)=>{
    try{
        let note= await Blog.findById(req.params.id);
        // note.user= null;
        res.send({success:true, note})
    }catch(error){
        res.send({success:false, error});
    }
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
        let {title,id,tags,description,public}=req.body;
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
            tags,
            public
        })
        blog.save();
        res.send({success:true,blog});
        return;
    }catch(err){
        success=false;
        console.log("Errors in saving")
        res.send({success,error:err})
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