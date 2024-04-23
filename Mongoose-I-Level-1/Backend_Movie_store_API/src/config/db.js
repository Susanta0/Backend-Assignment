const { connect } = require("mongoose");

const mongooseDb = () => {
   connect("mongodb://localhost:27017/moviesDb");
};
module.exports = mongooseDb;
