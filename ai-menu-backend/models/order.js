const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    tableId: { type: String, required: true },
    items: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, default: 1 },
        },
    ],
    status: { type: String, default: "pending", enum: ["pending", "completed"] },
    payment: { type: String, default: "pending", enum: ["pending", "completed"] },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
