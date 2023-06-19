const Item = require("../models/items");

const APIFeatures = require("../util/apiFeature");

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
    let filter = {};

    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Item.find(filter), req.query).paginate();

    const doc = await features.query;

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

    res.status(200).json({
      status: "sucess",

      data: {
        data: doc,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failure",
      message: "Item not found!",
    });
  }
};
exports.editItem = async (req, res) => {
  try {
    const doc = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failure",
      message: "Item to edit not found!",
    });
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const doc = await Item.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "failure",
      message: "Item to delete not found!",
    });
  }
};
