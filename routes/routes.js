const express = require('express');
const Model = require('../Model/models');

const router = express.Router();

router.get('/getAll', async(req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
})

router.get('/get/:id', async (req, res) => {

   

    try{

        const dataToUpdate = await Model.findById(req.params.id)
        res.json(dataToUpdate);
    }
    catch(error){

        res.status(400).json({message: error.message});
    }
   
})

router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
})

router.patch('/patch/:id', async(req, res) => {

    

    try{
        const id = req.params.id;
        const dataToUpdate = req.body;
        const options = {new: true};
        const dataToSave = await Model.findByIdAndUpdate(id, dataToUpdate, options);
        res.status(200).json(dataToSave);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
    
})

router.delete('/delete/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const dataToSave = await Model.findByIdAndDelete(id);
        res.status(200).json(dataToSave);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
})

module.exports = router;