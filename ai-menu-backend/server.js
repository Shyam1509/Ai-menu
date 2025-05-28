require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io"); // FIXED: Correct import for Socket.IO
const cors = require("cors");
const connectDB = require("./config/db");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const generateqr = require("./routes/generateqrRoutes");
const socketHandler = require("./middleware/socketio");

const PORT = process.env.PORT || 5500;

const app = express(); // FIXED: Use "app" for express
const server = http.createServer(app); // FIXED: Use "server" for http server

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Allow frontend
      methods: ["GET", "POST"],
      transports: ["websocket", "polling"], // Allow WebSocket & Polling
      credentials: true
    }
  });
  

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" })); // Allow all origins (for testing)

// Connect Database
connectDB();

// Routes
app.use("/menu", menuRoutes);
app.use("/order", orderRoutes);
app.use("/generate-qr", generateqr);

// Attach Socket.IO to the app
app.set("io", io);

// Initialize Socket.IO logic
socketHandler(io);

// Start Server
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
