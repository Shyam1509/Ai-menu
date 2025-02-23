const Menu = require("../models/menu")

// Get all menu items
exports.getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json(menu);
  } catch (error) {
    console.error("❌ Error fetching menu:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new menu item with validation
exports.addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Validation
    if (!name || !description || !price || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Ensure price is a valid number
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ error: "Price must be a positive number" });
    }

    const newItem = new Menu({ name, description, price, category });
    await newItem.save();

    res.status(201).json({ message: "Menu item added successfully", newItem });
  } catch (error) {
    console.error("❌ Error adding menu item:", error);
    res.status(500).json({ error: "Failed to add menu item" });
  }
};

// Delete a menu item with validation
exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    await Menu.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting menu item:", error);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
};
