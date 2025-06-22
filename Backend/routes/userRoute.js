const express = require('express');
const multer = require('multer');
const { loginUser, registerUser } = require('../controllers/userController.js');

const uploads = multer();

const userRouter = express.Router();

userRouter.post('/register',uploads.none(), registerUser);
userRouter.post('/login',loginUser);

module.exports = userRouter;