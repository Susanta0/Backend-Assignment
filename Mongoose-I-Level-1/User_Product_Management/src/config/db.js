const {connect} = require("mongoose");
const mongooseConnect = async () => {
  await connect("mongodb://localhost:27017/Users_Product");
};
module.exports = mongooseConnect;
