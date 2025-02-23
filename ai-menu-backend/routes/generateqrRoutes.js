const express = require("express");
const {generateQRCode} = require("../controllers/generateqrContrloller");

const router = express.Router();

router.post("/", generateQRCode);


module.exports = router;
