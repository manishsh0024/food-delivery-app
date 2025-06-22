const express = require('express');
const { addFood, listFood, removeFood } = require('../controllers/foodController.js');
const multer = require('multer');


const foodRouter = express.Router();


// image storage configuration
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()} ${file.originalname}`);
    }
})

const upload = multer({ storage: storage});

// Routes
foodRouter.post('/add', upload.single("image"), addFood);
foodRouter.post('/remove', removeFood);
foodRouter.get('/list', listFood );











module.exports = foodRouter;