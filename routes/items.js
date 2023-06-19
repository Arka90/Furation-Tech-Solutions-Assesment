const express = require("express");
const itemController = require("../controllers/itemController");
const router = express.Router();
const passport = require("passport");
const adminController = require("../controllers/adminController");

router
  .route("/")
  .get(itemController.getAllItems)
  .post(
    passport.authenticate("jwt", { session: false }),
    itemController.createItem
  );

router
  .route("/:id")
  .get(itemController.getItem)
  .put(
    passport.authenticate("jwt", { session: false }),
    itemController.editItem
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    itemController.deleteItem
  );

module.exports = router;
