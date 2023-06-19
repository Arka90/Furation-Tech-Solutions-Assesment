const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A item must have a name"],
    maxlength: [40, "A item name must have less or eqal 40 characters"],
    minlength: [10, "A item name must have more or eqal 10 characters"],
  },

  description: {
    type: String,
  },

  price: {
    type: Number,
    required: [true, "A item must have a price"],
  },

  stock: {
    type: Number,
    default: 50,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
