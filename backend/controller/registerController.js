import express from "express";
import * as bcrypt from "bcrypt";

import User from "../schema/user.schema.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

const registerHandler = async (req, res) => {
  const { username, password, email, name, role, opd } = req.body;

  // check if every field is not empty
  if (!username || !password || !email || !name || !role) {
    return res.status(400).send("Please enter all the fields");
  }

  const user = await User.findOne({ username });
  if (user) {
    // Check if user is found
    return res.status(400).send({message:"User already exists", user: user.username});
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const _id = new mongoose.Types.ObjectId();
  const newUser = new User({
    _id,
    username,
    password: hashedPassword,
    email: email,
    name: name,
    role: role,
    perangkatdaerah: opd,
  });
  // save the new user to mongodb and return the response
  try {
    await newUser.save();
    res
      .status(201)
      .send({
        message: "User Created Successfully",
        user: newUser.username,
        id: newUser._id,
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export default registerHandler;
