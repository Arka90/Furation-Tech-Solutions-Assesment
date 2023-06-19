const express = require("express");
const itemController = require("../controllers/itemController");
const router = express.Router();

router
  .route("/")
  .get(itemController.getAllItems)
  .post(itemController.createItem);

router
  .route("/:id")
  .get(itemController.getItem)
  .put(itemController.editItem)
  .delete(itemController.deleteItem);

module.exports = router;
