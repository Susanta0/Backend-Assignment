const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    modelName: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    color: {
      type: String,
      required: true,
      enum: ["black","sky blue","green", "blue", "white", "gray", "red", "golden"],
    },
    description: { type: String, required: true, unique: true },
    image: { type: String, required: true, unique: true },
  },
  { versionKey: false }
);

const productModel = model("product", productSchema);
module.exports = productModel;
