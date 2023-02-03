import UserModel from "../model/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        

        const salt= await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt)

        const doc = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: passwordHash
        })
        const user = await doc.save();
        const token = jwt.sign({
            _id: user._id
        }, "secretkey321", {expiresIn: "30d"});

        const {password, ...userData} = user._doc;
        res.json({...userData, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Could not sign up"});
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if(!user) return res.status(400).json({message: "User not found!"})

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);
        if(!isValidPass) return res.status(400).json({message: "Login or password is incorrect!"}) 

        const token = jwt.sign({
            _id: user._id
        }, "secretkey321", {expiresIn: "30d"});

        const {password, ...userData} = user._doc;
        res.json({...userData, token})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Authorization failed!"})
    }
};

export const userInfo = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if(!user) return res.status(404).json({message: "User not found!"});
        const {password, ...userData} = user._doc;
        res.json({...userData})
    } catch (error) {
        console.log(error);
        return res.status(403).json({message: "No access!"})
    }
};