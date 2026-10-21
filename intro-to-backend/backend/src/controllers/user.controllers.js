import { User } from "../models/user.models.js";

const registerUser = async (req,res) => {
    try {
        const {username, password, email} = req.body;

        if(!username || typeof email !== "string" || !email.trim() || !password){
            return res.status(400).json({message:"all fields are important"})
        }

        //check if user already exists
        const normalizedEmail = email.trim().toLowerCase();
        const existing = await User.findOne({email: normalizedEmail});
        if(existing){
            return res.status(400).json({message:"user already exists"});
        };

        //create user
        const user = await User.create({
            username,
            password,
            email: normalizedEmail,
            loggedIn:true
        });

        res.status(201).json({message:"user registered",
            user:{id: user._id,
                email:user.email,
                usernsme:user.username
            }
        })
    } catch (error) {
        res.status(500).json({message:"internal server error", error:error.message})
    }
}

const loginUser = async (req, res) => {
    try {
        //checking if the user already exists
        const {email, password} = req.body;

        if(typeof email !== "string" || !email.trim() || !password){
            return res.status(400).json({message:"all fields are important"})
        }

        const normalizedEmail = email.trim().toLowerCase();
        const user =  await User.findOne({
            email: normalizedEmail
        })

        if(!user){
            res.status(400).json({message:"User not found"})
        };

        //compare password
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Cridentials"})
        }

        res.status(200).json({
            message:"user loggged in",
            user:{
                id: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        res.status(500).json({message:"internal server error", error:error.message})
    }
}

const logoutUser = async (req,res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({
            email
        });

        if(!user){
            return res.status(404).json({message:"user not found"});
        };

        res.status(200).json({
            message:"Logout successfully"
        });

    } catch (error){
        res.status(500).json({
            message:"internal server errro", 
            error:error.message
        });
    };
}
export {
    registerUser,
    loginUser,
    logoutUser
};