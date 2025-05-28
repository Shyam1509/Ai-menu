
module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log(`User connected:, ${socket.id}`);
        
        socket.on("place_order", (orderData) => {
            console.log("New order received:", orderData);
            io.emit("New order:", orderData)
            
        })

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
            
        })
    })
}