const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let folderSchema = new Schema(
    {
        folderName: { type: String, required: true },
        folderNumber: { type: String, default: "", required: true },
        folderOwner: { type: String, default: "", required: true }
    }
);

module.exports = mongoose.model("folderModel", folderSchema);