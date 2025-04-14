import {UserModel} from "../models/userModel.js";
import { mailTransporter, registerUserMailTemplate } from "../utils/mail.js";
import {loginUserValidator , registerUserValidator, updatedUserValidator} from "../validators/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
    //Validate user information
    const {error, value} = registerUserValidator.validate(req.body);
    if (error){
        return res.status(422).json(error)
    } 
    //check if user does not exist already
    const user = await UserModel.findOne({
        $or:[
            {username: value.username},
            {email: value.email}
        ]
    });
    if(user){
        return res.status(409).json('user already exists')
    }
    //Hash plaintext password
    const hashedPassword = bcrypt.hashSync(value.password, 10);
    //create user record in database
    const result = await UserModel.create({
        ...value,
        password: hashedPassword
    })
    //send registration email to user
    await mailTransporter.sendMail({
        from: "bbklartey@gmail.com",
        to: value.email,
        subject: "Nodemailer Test",
        // text:`Dear ${value.username}, \n A new account has been created! \n Thank you!`,
        html: registerUserMailTemplate.replace('{{username}}', value.username)
    });
    //(optional) Genarate access token for user
    //Return Response
    res.status(201).json('user registered successfully')
}

export const loginUser = async (req, res, next) => {
    //Validate user information
    const {error, value} = loginUserValidator.validate(req.body);
    if (error){
        return res.status(422).json(error)
    } 
    //Find matching user record in database
    const user = await UserModel.findOne({
        $or:[
            {username: value.username},
            {email: value.email}
        ]
    });
    if(!user){
        return res.status(409).json('user does not exist')
    }
    //compare incoming password with saved password
    const correctPassword = bcrypt.compareSync(value.password, user.password)
    if(!correctPassword){
        return res.status(401).json({message: "Invalid credentials"})
    }
    //Generate access token for user
    const accessToken = jwt.sign({id:user.id}, process.env.JWT_SECRET_KEY, {expiresIn: "24h"})
    //Return a response
    res.status(200).json({
        accessToken,
        user: {
            role: user.role,
            email: user.email
        }

    })
 
}

export const updateUser = async (req, res, next) => {
    //Validate request body
    const {error, value} = updatedUserValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }
    //Update user in database
    const user = await UserModel.findByIdAndUpdate(
        req.params.id,
        value,
        {new: true}
    );
    //return response
    res.status(200).json('user updated successfully!')
}

export  const getAuthenticatedUser = async(req, res, next) => {
    try {
        //Get user by id using req.auth.id
        const result = await UserModel.findById(req.auth.id).select({
            password: false
        });
        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}
