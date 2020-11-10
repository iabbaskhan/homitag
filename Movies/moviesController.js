const { Movies } = require("../Movies/movie-model");

const {getAllItems, getOneItem, addItem, updateItem, deleteItem} = require("../utils/db-operations");


/**
 * @description Returns an array of all the movies currently in database
 * @returns {object} A JSON object containing all the movies in an array called ```results```
 */
module.exports.getMovieList = async (req, res) => {

    try {
        
        let allMovies = await getAllItems(Movies);
        
        if(!allMovies.success) res.status(500).send({success: false, error: "Error getting info from database"});

        res.status(201).send({success: true, result: allMovies.result});

    }

    catch(getAllError) {
        res.status(500).send({success: false, error: `Error getting info from database. Error: ${getAllError}`});
    }

}

/**
 * @description Returns info about a specific movie. Expects the movie's ID as a request parameter
 * @returns {object} Info about the movie in JSON format
 */
module.exports.getMovieInfo = async (req, res) => {

    try {

        let movieId = req.params.movieId;
        
        let movieInfo = await getOneItem(Movies, {_id: movieId});
        
        if(!movieInfo.success) res.status(500).send({success: false, error: "Error getting info from database"});

        res.status(201).send({success: true, result: movieInfo.result});

    }

    catch(getOneError) {
        res.status(500).send({success: false, error: `Error getting info from database. Error: ${getOneError}`});
    }

}

/**
 * @description Adds a new movie to the database. Doesn't perform any checks for duplicate movie names.
 *              Expects the movie info as POST body inside the ```movieInfo```
 * @returns {object} The newly created movie
 */
module.exports.addMovie = async (req, res) => {
    try {

        let {movieInfo} = req.body;

        if(movieInfo.hasOwnProperty("releaseDate")) movieInfo.releaseDate = Date.parse(movieInfo["releaseDate"]);
        
        let addedMovie = await addItem(Movies, movieInfo);
        
        if(!addedMovie.success) res.status(500).send({success: false, error: "Error adding item to database"});

        res.status(201).send({success: true, result: addedMovie.result});

    }

    catch(addItemError) {
        console.log(`Error while adding movie: ${JSON.stringify(addItemError)}`);
        res.status(500).send({success: false, error: `Error adding item to database. Error: ${addItemError}`});
    }

}


/**
 * @description Updates an already existing movie. Expects the movie ID and updates in POST body as ```movieId``` and ```updates```, respectively.
 * 
 * @returns {object} The updated created movie
 */
module.exports.updateMovie = async (req, res) => {
    try {

        let {movieId, updates} = req.body;
        
        let updatedMovie = await updateItem(Movies, {_id: movieId}, updates);
        
        if(!updatedMovie.success) res.status(500).send({success: false, error: "Error updating item in database"});

        res.status(201).send({success: true, result: updatedMovie.result});

    }

    catch(updateItemError) {
        res.status(500).send({success: false, error: `Error updating item in database. Error: ${updateItemError}`});
    }

}

/**
 * @description Deletes an already existing movie. Expects the movie ID in request parameters as ```movieId```.
 * 
 * @returns {object} The deleted movie
 */
module.exports.deleteMovie = async (req, res) => {
    try {

        let movieId = req.params.movieId;
        
        let deletedMovie = await deleteItem(Movies, {_id: movieId});
        
        if(!deletedMovie.success) res.status(500).send({success: false, error: "Error deleting item from database"});

        res.status(201).send({success: true, result: deletedMovie.result});

    }

    catch(deleteItemError) {
        res.status(500).send({success: false, error: `Error deleting item from database. Error: ${deleteItemError}`});
    }

}