const express=require('express');
const fetchuser = require('../middleware/fetchuser');
const router= express.Router();
const Note=require('../models/Note');
const { body,validationResult } = require('express-validator');

//fetching all notes
router.get('/allnotes', fetchuser,async (req,res)=>{
    let notes=await Note.find({user:req.user.id});
    res.send(notes);
})

//add new note
router.post('/savenote', fetchuser,[
    body('title','Enter a valid title').isLength({min:1, max:20}),
    // body('description', 'There must be something in the note')
],async(req,res)=>{
    let errors= validationResult(req);
    if(!errors.isEmpty()){
        res.send("Errors while validating");
        return;
    }
    
    let note=new Note({
        description:req.body.description,
        title:req.body.title,
        tag:req.body.tag,
        user:req.user.id
    })
    let savedNotes= await note.save();
    res.send(savedNotes);
})

//Updating a note
router.put('/updateNote/:id', fetchuser, async(req,res)=>{
    let {title,description,tag}= req.body;
    let newNote = {};
    if(title){newNote.title=title;}
    if(description){newNote.description=description;}
    if(tag){newNote.tag=tag;}

    let note = await Note.findById(req.params.id);
    if(!note){
        res.send("Invalid note");
        return;
    }

    if(note.user.toString() !== req.user.id){
        res.send("Not your note");
        return;
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.send(note);
})

//Deleting a note
router.delete('/deleteNote/:id', fetchuser, async(req,res)=>{
    // let {title,description,tag}= req.body;
    // let newNote = {};
    // if(title){newNote.title=title;}
    // if(description){newNote.description=description;}
    // if(tag){newNote.tag=tag;}

    let note = await Note.findById(req.params.id);
    if(!note){
        res.send("Invalid note");
        return;
    }

    if(note.user.toString() !== req.user.id){
        res.send("Not your note");
        return;
    }

    await Note.findByIdAndDelete(req.params.id);
    res.send("The note is deleted");
})



module.exports= router;