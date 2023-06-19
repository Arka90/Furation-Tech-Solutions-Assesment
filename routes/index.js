const express = require("express");

const router = express.Router();

router.use("/items", require("./items"));
router.use("/admin", require("./admin"));

module.exports = router;
