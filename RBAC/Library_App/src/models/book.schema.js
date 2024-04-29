const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genres: { type: String, required: true },
    totalCopies: { type: Number, default: 1 },
    availableCopies: { type: Number, default: 1 },
    publishDate: { type: Date, default: Date.now },
  },
  { versionKey: false }
);
const bookModel = model("book", bookSchema);

module.exports = bookModel;
