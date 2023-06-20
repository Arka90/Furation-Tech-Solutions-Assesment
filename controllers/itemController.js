const Item = require("../models/items");
const logger = require("../util/logger");

exports.createItem = async (req, res) => {
  try {
    const doc = await Item.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });

    logger.itemLogger.log("info", "Item sucessfully added");
  } catch (err) {
    res.status(409).json({
      status: "failure",
      message: err.message,
    });
    logger.itemLogger.log("error", "Error adding item");
  }
};
exports.getAllItems = async (req, res) => {
  try {
    // Pagination Logic

    // Setting page number
    let page = Number(req.query.page) || 1;

    //Setting limit
    let limit = Number(req.query.limit) || 3;

    // formula to skip
    let skip = (page - 1) * limit;

    // modifying the doc according to page
    let doc = await Item.find().skip(skip).limit(limit);

    res.status(200).json({
      status: "sucess",
      results: doc.length,
      data: {
        data: doc,
      },
    });
    logger.itemLogger.log("info", "Items sucessfully returned");
  } catch (err) {
    res.status(409).json({
      status: "failure",
      message: err.message,
    });
    logger.itemLogger.log("error", "Error in returning item");
  }
};
exports.getItem = async (req, res, next) => {
  try {
    const doc = await Item.findById(req.params.id);

    if (!doc) {
      res.status(404).json({
        status: "failure",
        message: "Item not found!",
      });
      logger.itemLogger.log("error", "Item not found");
    } else {
      res.status(200).json({
        status: "sucess",

        data: {
          data: doc,
        },
      });
      logger.itemLogger.log("info", "Item found");
    }
  } catch (err) {
    res.status(404).json({
      status: "failure",
      message: err.message,
    });
    logger.itemLogger.log("error", "Item not found");
  }
};
exports.editItem = async (req, res) => {
  try {
    const doc = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      res.status(404).json({
        status: "failure",
        message: "Item to update not found!",
      });
      logger.itemLogger.log("error", "Item not found");
    } else {
      res.status(200).json({
        status: "sucess",

        data: {
          data: doc,
        },
      });
      logger.itemLogger.log("info", "Item sucessfully updated");
    }
  } catch (err) {
    res.status(404).json({
      status: "failure",
      message: err.message,
    });
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const doc = await Item.findByIdAndDelete(req.params.id);

    if (!doc) {
      res.status(404).json({
        status: "failure",
        message: "Item not found!",
      });
      logger.itemLogger.log("error", "Item not found");
    } else {
      res.status(200).json({
        status: "sucess",

        data: null,
      });

      logger.itemLogger.log("info", "Item sucessfully deleted");
    }
  } catch (err) {
    res.status(404).json({
      status: "failure",
      message: err.message,
    });
    logger.itemLogger.log("error", "Item not found");
  }
};
