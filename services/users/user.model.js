const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        userName: { type: String, required: true },
        userMobileNumber: { type: String, default: "" }
    }
);

module.exports = mongoose.model("userModel", userSchema);