const express = require('express');
const router = express.Router();
const Person = require('./../models/Person')


// Post route to add person
router.post('/', async(req, res)=>{
    try{
        const data = req.body
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);  
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

// Get method to get the person
router.get('/', async(req, res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched successfully');
        res.status(200).json(data);
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/:workType', async(req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType=='chef' || workType=='manager' || workType=='waiter'){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
})

// Update the data of person
router.put('/:id', async(req, res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true,
            runValidator:true
        })
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data successfully updated');
        res.status(200).json(response);

    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.delete('/:id', async(req, res)=>{
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data successfully deleted');
        res.status(200).json({message: 'person deleted successfuly'});


    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'});

    }
})
module.exports = router;



