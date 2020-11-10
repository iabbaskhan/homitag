const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const Schema = mongoose.Schema;

let moviesSchema = new Schema({
    name: {
        type: String,
        default: "No Title"
    },
    description: {
        type: String,
        default: "No description provided"
    },
    releaseDate: {
        type: Date,
        default: new Date()
    },
    genres: [
        {
            type: Schema.Types.ObjectId,
            ref: "Genre"
        }
    ]
});

moviesSchema.plugin(timestamps);

let moviesModel = mongoose.model("Movie", moviesSchema);

module.exports = {
    Movies: moviesModel
}