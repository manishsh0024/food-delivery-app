const userModel = require ('../models/userModel.js');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');
const validator = require ('validator');


// Login User

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        // User Check
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(500).json({
                success:false,
                message:res.message || "Incorrect email or password"
            });
        }

        // Password Check

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(500).json({
                success:false,
                message: res.message || "Incorrect email or password"
            });
        }

        // create Token
        const token = createToken(user._id);
        res.json({
            success:true,
            token:token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}

//Create Token
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET_KEY);
};


// Register User

const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        // User CHeck
        const exist = await userModel.findOne({email});
        if(exist) {
            return res.json({success:false, message:"User already exist"});
        }

        // Email Formate and Stronge Password
        if(!validator.isEmail(email)) {
            return res.json({success:false, message:"Incorrect email and password"});
        }

        //Password length checking
        if(password.length<6) {
            return res.json({success:false, message:"Enter strong password "});
        }

        //Hashing user Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)


        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true, token:token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

module.exports = {
    loginUser,
    registerUser
}