const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

// Post route to add person
router.post('/', async(req, res)=>{
    try{
        const data = req.body
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);  
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

// Get the data of Menu
router.get('/', async(req, res)=>{
    try{
        const data = await MenuItem.find();
        console.log('data fetched successfully');
        res.status(200).json(data);
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/:tasteType', async(req, res)=>{
    try{
        const tasteType = req.params.tasteType;
        if(tasteType=='sweet' || tasteType=='spicy' || tasteType=='sour'){
            const response = await MenuItem.find({taste: tasteType});
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

router.put('/:id', async(req, res)=>{
    try{
        const menuId = req.params.id;
        const updatedMenuData = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData,{
            new: true,
            runValidator:true
        })
        if(!response){
            return res.status(404).json({error: 'Menu not found'});
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
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({error: 'Menu not found'});
        }
        console.log('menu successfully deleted');
        res.status(200).json({message: 'menu deleted successfuly'});
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error'});

    }
})

module.exports= router;