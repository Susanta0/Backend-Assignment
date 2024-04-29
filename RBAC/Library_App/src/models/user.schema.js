const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum:["viewer","creator","viewall"], default:"viewer"},

  },
  { versionKey: false }
);
const userModel = model("users", userSchema);

module.exports=userModel

