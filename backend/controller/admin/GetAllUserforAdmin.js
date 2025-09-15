import express from "express";

import User from "../../schema/user.schema.js";

const GetAllUser = async (req, res) => {
  try {
    const users = await User.find({role: {$ne: "Admin" || "admin"}});
    const userlist = users.map(user => ({
      id: user._id,
      username: user.username,
      role: user.role,
      name: user.name
    }));
    res.send(userlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export default GetAllUser;
