const Item = require("../models/items");

exports.createItem = async (req, res) => {
  try {
    const doc = await Item.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (err) {
    res.status(409).json({
      status: "failure",
      message: err.message,
    });
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
  } catch (err) {
    res.status(409).json({
      status: "failure",
      message: err.message,
    });
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
    } else {
      res.status(200).json({
        status: "sucess",

        data: {
          data: doc,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "failure",
      message: err.message,
    });
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
    } else {
      res.status(200).json({
        status: "sucess",

        data: {
          data: doc,
        },
      });
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
    } else {
      res.status(200).json({
        status: "sucess",

        data: null,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "failure",
      message: err.message,
    });
  }
};
