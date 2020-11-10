const express = require("express");
const bodyParser = require("body-parser");

const {MoviesRouter} = require("./Movies/movie-routes");
const {GenresRouter} = require("./Genres/genre-routes");

var app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use("/api/movies", MoviesRouter);
app.use("/api/genres", GenresRouter);


const server = app.listen(port, () => {
    console.log(`Server listening on port: ${port} - http://localhost:${port}`);
  });

module.exports = server;