const Order = require("../models/order");
const cloudinary = require("../config/cloudinary");

// Get all menu items
// exports.getMenu = async (req, res) => {
//   try {
//     const menu = await Menu.find();
//     res.status(200).json(menu);
//   } catch (error) {
//     console.error("❌ Error fetching menu:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// Add a new menu item with validation

exports.ordered = async (req, res) => {
    try {
        console.log("📩 Received Order Data:", req.body);

        const { tableId, items } = req.body;

        if (!tableId || !items || items.length === 0) {
            return res.status(400).json({ error: "Invalid order data" });
        }

        let order = await Order.findOne({ tableId });

        if (order) {
            // ✅ Check if the item already exists in the order
            items.forEach((newItem) => {
                const existingItem = order.items.find((item) => item.name === newItem.name);
                if (existingItem) {
                    existingItem.price += newItem.price;
                    existingItem.quantity += newItem.quantity;
                } else {
                    order.items.push(newItem);
                }
            });

            // ✅ Save updated order
            await order.save();

            console.log("✅ Updated Existing Order:", order);
            return res.status(200).json({ message: "Order updated successfully!", order });
        }

        // ✅ Create New Order if no existing order
        const newOrder = new Order({
            tableId,
            items,
            status: "pending",
            payment: "pending",
            createdAt: new Date(),
        });

        await newOrder.save();

        req.io.emit("New order:", newOrder)

        console.log("✅ Order Saved:", newOrder);
        res.status(201).json({ message: "Order placed successfully!", order: newOrder });

    } catch (error) {
        console.error("❌ Error placing order:", error);
        res.status(500).json({ error: "Server error" });
    }
};
