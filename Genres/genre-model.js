const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const Schema = mongoose.Schema;

let genreSchema = new Schema({
    name: {
        type: String,
        default: "Unnamed Genere"
    },
    description: {
        type: String,
        default: "No description provided"
    }
});


genreSchema.plugin(timestamps);

let genreModel = mongoose.model("Genre", genreSchema);

module.exports = {
    Genres: genreModel
}