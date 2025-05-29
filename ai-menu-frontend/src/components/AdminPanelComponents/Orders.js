import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://ai-menu-0xwb.onrender.com", {
  transports: ["websocket", "polling"], // Allow WebSocket & Polling
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 2000,
});

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to Socket.IO with ID:", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Connection Error:", error);
    });

    socket.on("disconnect", () => {
      console.warn("❌ Disconnected from Socket.IO");
    });

    socket.on("new_order", (orderData) => {
      console.log("🛒 New Order Received:", orderData);
      setOrders((prevOrders) => [...prevOrders, orderData]); // Update orders
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.off("new_order");
    };
  }, []);

  return (
    <div>
      <h2>Admin Panel - Orders</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>{`Table ${order.table}: ${order.items.join(", ")} - ${order.status}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
