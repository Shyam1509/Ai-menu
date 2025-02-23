const express = require("express");
const { getMenu, addMenuItem, deleteMenuItem } = require("../controllers/menuController");

const router = express.Router();

router.get("/get", getMenu);
router.post("/add", addMenuItem);
router.delete("/:id", deleteMenuItem);

module.exports = router;
