import jwt from "jsonwebtoken";

import User from "../schema/user.schema.js";

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            throw res.status(401).send({ error: "Invalid Token / User not Found" });
        }

        req.token = token;
        req.id = user._id;
        req.user = user.username;
        req.role = user.role;
        req.opd = user.perangkatdaerah;
        next();
    } catch (error) {
        res.status(401).send({ error: "Unauthorised" });
    }
};

export default auth;