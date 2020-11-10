const Router = require("express").Router();

const {getGenreList, getGenreInfo, addGenre, updateGenre, deleteGenre } = require("./genreController");

Router.route("/all").get(getGenreList);
Router.route("/:genreId").get(getGenreInfo);
Router.route("/add").post(addGenre);
Router.route("/update").put(updateGenre);
Router.route("/delete/:genreId").delete(deleteGenre);

module.exports.GenresRouter = Router;