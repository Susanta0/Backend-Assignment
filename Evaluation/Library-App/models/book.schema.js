const { Schema, model } = require("mongoose");
const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    discription: { type: String, required: true },
    year: { type: Date, default: "2023" },
  },
  { versionKey: false }
);

const bookModel = model("books", bookSchema);

module.exports = bookModel;
