import express from 'express';
import auth from '../connection/auth.js';

import getFileByUser from '../controller/getfiledashboard.js';

const router = express.Router();

router.get('/', auth, (req, res) => {
    res.send({
        id: req.id,
        user: req.user,
        role: req.role,
        token: req.token
    });
});

router.get("/files", auth, getFileByUser)

export default router;