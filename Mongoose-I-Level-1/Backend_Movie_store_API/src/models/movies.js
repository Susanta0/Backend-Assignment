const { Schema, model } = require("mongoose");

const moviesSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    releaseYear: { type: Number, required: true },
    duration: { type: String, required: true },
    genres: { type: String, required: true },
    director: { type: String, required: true },
    image: { type: String, required: true, unique: true },
    reviews: { type: String, required: true },
  },
  { versionKey: false }
);

const moviesModel = model("movie", moviesSchema);

module.exports = moviesModel;
