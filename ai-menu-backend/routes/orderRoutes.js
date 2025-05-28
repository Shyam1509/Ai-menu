const express = require("express");
const router = express.Router();
const { ordered, updateOrder } = require("../controllers/orderController");
const multer = require("multer");
const order = require("../models/order");

const upload = multer({ dest: "uploads/"});


router.post("/", (req, res) => {
    req.io = req.app.get("io");
    ordered(req, res)
});
// router.get("/get", getMenu);
// router.put("/:tableId", updateOrder);

module.exports = router;
