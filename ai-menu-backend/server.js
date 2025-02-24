require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const menuRoutes = require("./routes/menuRoutes");
const generateqr = require("./routes/generateqrRoutes");
const PORT = process.env.PORT || 5500;

const server = express();

// Middleware
server.use(express.json());
server.use(cors({ origin: "*" })); // Allow all origins (for testing)


// Routes
server.use("/menu", menuRoutes);
server.use("/generate-qr", generateqr);


// Start Server
server.listen(PORT, () => 
    console.log(`🚀 Server running on port ${PORT}`),
    connectDB()
);
