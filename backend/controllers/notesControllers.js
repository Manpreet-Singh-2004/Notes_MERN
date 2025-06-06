const { json } = require('express')
const NoteSchema = require('../models/noteModel')
const mongoose = require('mongoose')

// Fetching all the notes
const getNotes = async(req, res)=>{
    const notes = await NoteSchema.find({}).sort({createdAt: -1})

    res.status(200).json(notes)
}

// Getting a single note
const getSingleNote = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            error: "Not a Valid ID"
        })
    }

    const note = await NoteSchema.findById(id)

    if(!note){
        return res.status(404).json({
            error:"Note not found"
        })
    }

    res.status(200).json(note)
}

//  Creating a new Note
const CreatingNote = async(req, res)=>{
    
    const {title, description, tag} = req.body

    try{
        const note = await NoteSchema.create({title, description, tag})
        res.status(200).json({
            message: "Note has been added",
            note: note
        })
    }
    catch(error){
        res.status(400).json({
            msg: "Note couldnt be added",
            error: error
        })
    }
}

//  Deleting a note
const deleteNote = async(req, res)=>{
    const{id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error:"Id is not valid"
        })
    }
    const note = await NoteSchema.findByIdAndDelete({_id: id})
    if(!note){
        return res.status(400).json({
            error:"No such note exist"
        })
    }
    res.status(200).json({
        msg:"Note deleted",
        note: note
    })
}

// Updating a note
const updateNote = async(req, res)=>{
    const{id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error:"Id is not valid"
        })
    }

    const note = await NoteSchema.findByIdAndUpdate(id, {
        ...req.body
    }, {new: true})

    if(!note){
        return res.status(400).json({
            error:"No such Note is found"
        })
    }
    res.status(200).json(note)
}

module.exports = {
    getNotes,
    getSingleNote,
    CreatingNote,
    deleteNote,
    updateNote
}