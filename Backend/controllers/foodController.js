const foodModel = require('../models/foodModel.js');

const fs = require('fs');


// add Food items

const addFood = async(req, res) => {

    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.status(201).json({
            success: true,
            message: "Food added successfully",
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Failed to add food : ${error.message}`,
        })
    }


}


// All food List

const listFood = async(req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({
            success: true,
            data: foods
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Failed to fetch food items : ${error.message}`,
        })
    }
}


// Remove food item

const removeFood = async(req, res) =>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{});

        await foodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({
            success: true,
            message: "Food item removed successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Failed to remove food item : ${error.message}`,
        })
    }
}


module.exports = {
    addFood , listFood , removeFood
};