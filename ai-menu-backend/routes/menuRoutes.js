const express = require("express");
const router = express.Router();
const { getMenu, addMenuItem, deleteMenuItem } = require("../controllers/menuController");
const multer = require("multer");

const upload = multer({ dest: "uploads/"});


router.post("/add", upload.single("image"), addMenuItem);
router.get("/get", getMenu);
router.delete("/:id", deleteMenuItem);

module.exports = router;
