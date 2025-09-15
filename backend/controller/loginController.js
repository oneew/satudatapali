// login to dashboard

import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../schema/user.schema.js";

function generateToken(user) {
    return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "1d",})
}


const loginHandler = async (req, res) => {
        try {
            // listen to request body
            const { username, password } = req.body;
            
            // check if email and password is not empty
            if (!username || !password) {
                return res.status(400).send({message: "Please enter all the fields"});
            }
            

            const user = await User.findOne({ username }); 
                if (!user) {
                    res.status(400).send({message: "User Tidak Ditemukan"});
                } else {
                    const isPasswordMatch = await bcrypt.compare(password, user.password);
                        if (!isPasswordMatch) {
                        res.status(400).send({message: "Password Salah"});
                        } else {
                        const token = generateToken(user);
                        res.status(200).send({message: "Login successful", token, user: user.username, id: user._id, role: user.role}); };
                        }
                } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    };

export default loginHandler;