// This file will contain all the routes for students

const express = require('express');
const Hobby = require('../model/HobbyModel');

const router = express.Router();

// Get all the hobbies
router.get('/',(req,res)=>{
    // find() - is a mongoDB command to get all objects
    // exec() - will run the command in the db.
    Hobby.find({}).exec((err,hobbies)=>{
        if(err) console.log(err.message);
        else res.json(hobbies);
    })
})

// POST - Add a new hobby
router.post('/add', (req,res)=>{
    let newHobby = new Hobby();
    newHobby.name = req.body.name;
    newHobby.ifGroup = req.body.ifGroup;
    newHobby.limitAge =  req.body.limitAge;
    newHobby.address = req.body.address;

    newHobby.save((err, hobby)=>{
        if(err){
            res.status(404);
            res.send("Failed saving...");
        }
        else{
            res.status(201);
            res.send('New Hooby was added successfully');
        }
    })
})

// PUT - update the hobby limit age:
router.put('/update/:name',(req,res)=>{

    // const newLimitAge = req.body.newLimitAge;

// findOneAndUpdate ({who to update},{new data},(err,success))
    Hobby.findOneAndUpdate(
        { name: req.params.name}, { $set: {limitAge: req.body.newlimitAge }},
        (err, updateHooby) =>{
            if(err){
                res.status(404);
                res.send(`Failed updating hobby's new limit age...`);
            }
            else{
                res.status(200);
                res.send(`hobby's new limit age was updated successfully`);
            }
        }
    )
})

// DELETE- delete hooby by name
router.delete('/delete/:name',(req,res)=>{
    Hobby.deleteOne({name: req.params.name}).exec((err,hobby)=>{
        if(err) {
            res.status(404);
            res.send("Failed deleteing hobby....");

        }
        else {
            res.status(200);
            res.json(`hobby was deleted successfully`);
        }
    })
})



// export the file
module.exports = router;