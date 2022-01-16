

// Create the model for each object:
const mongoose = require('mongoose');

// Schema - collection
let HobbySchema = new mongoose.Schema(
    {
        name: String,
        ifGroup: Boolean,
        limitAge: Number,
        address : String
    },
    {
        strict:false
    }
)

//Use model to export the Schema:
const HobbyModel = mongoose.model("HobbySchema",HobbySchema);

// Export the model outside the file:
module.exports = HobbyModel;