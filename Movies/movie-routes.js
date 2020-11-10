const Router = require("express").Router();

const {getMovieList, getMovieInfo, addMovie, updateMovie, deleteMovie } = require("./moviesController");

Router.route("/all").get(getMovieList);
Router.route("/:movieId").get(getMovieInfo);
Router.route("/add").post(addMovie);
Router.route("/update").put(updateMovie);
Router.route("/delete/:movieId").delete(deleteMovie);

module.exports.MoviesRouter = Router;