import Menu from "../models/Menu.js";

// Admin adds a menu item
export const addMenuItem = async (req, res) => {
  const { name, price, readyTime, image } = req.body;
  try {
    const newMenuItem = new Menu({ name, price, readyTime, image });
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all menu items (for user end)
export const getMenuItems = async (req, res) => {
  try {
    const items = await Menu.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a menu item by ID (Admin only)
export const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    await menuItem.deleteOne();
    res.json({ message: "Menu item removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
