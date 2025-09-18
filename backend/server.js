import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDB from './connection/connect.js';

// Load environment variables
dotenv.config();
console.log('PORT from env:', process.env.PORT);

import FileDownload from './routes/FileDownload.js';
import filepageRoute from "./routes/filesRoute.js"
import dashboardRoute from "./routes/dashboardRoute.js"
import usersRoute from "./routes/usersRoute.js"
import integrationRoute from "./routes/integrationRoute.js"
import sipdRoute from './routes/sipdRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
const corsOptions = {
    credentials: true,
    allowedHeader: [
        "Content-Type",
        "set-cookie",
        "Access-Control-Allow-Origin",
    ]
};

app.use(express.static(path.join(__dirname, "/public/dist")));

app.use(cors(corsOptions));

app.use("/v1/files", filepageRoute);

app.use("/v1/users", usersRoute);

app.use("/v1/dashboard", dashboardRoute);

app.use("/v1/download", FileDownload);
app.use('/v1/sipd', sipdRoute);

// New integration routes
app.use("/v1/integration", integrationRoute);

// this route is redirecting every unknown route to index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
});

// connect to server using connect.js middleware
connectDB();

// listen to env port config or 5002 (instead of 5000/5001 to avoid conflicts)
const PORT = process.env.PORT || 5002;
console.log('Server will listen on port:', PORT);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});