const { Genres } = require("../Genres/genre-model");

const {getAllItems, getOneItem, addItem, updateItem, deleteItem} = require("../utils/db-operations");


/**
 * @description Returns an array of all the genres currently in database
 * @returns {object} A JSON object containing all the genres in an array called ```results```
 */

module.exports.getGenreList = async (req, res) => {

    try {
        
        let allGenres = await getAllItems(Genres);
        
        if(!allGenres.success) res.status(500).send({success: false, error: "Error getting info from database"});

        res.status(201).send({success: true, result: allGenres.result});

    }

    catch(getAllError) {
        res.status(500).send({success: false, error: `Error getting info from database. Error: ${getAllError}`});
    }

}

/**
 * @description Returns info about a specific genre. Expects the genre's ID as a request parameter
 * @returns {object} Info about the genre in JSON format
 */

module.exports.getGenreInfo = async (req, res) => {

    try {

        let genreId = req.params.genreId;
        
        let genreInfo = await getOneItem(Genres, {_id: genreId});
        
        if(!genreInfo.success) res.status(500).send({success: false, error: "Error getting info from database"});

        res.status(201).send({success: true, result: genreInfo.result});

    }

    catch(getOneError) {
        res.status(500).send({success: false, error: `Error getting info from database. Error: ${getOneError}`});
    }

}

/**
 * @description Adds a new genre to the database. Doesn't perform any checks for duplicate genre names.
 *              Expects the genre info as POST body inside the ```genreInfo```
 * @returns {object} The newly created genre
 */
module.exports.addGenre = async (req, res) => {
    try {

        let {genreInfo} = req.body;
        
        let addedGenre = await addItem(Genres, genreInfo);
        
        if(!addedGenre.success) res.status(500).send({success: false, error: "Error adding item to database"});

        res.status(201).send({success: true, result: addedGenre.result});

    }

    catch(addItemError) {
        console.log(`Error while adding genre`);
        res.status(500).send({success: false, error: `Error adding item to database. Error: ${addItemError}`});
    }

}

/**
 * @description Updates an already existing genre. Expects the genre ID and updates in POST body as ```genreId``` and ```updates```, respectively.
 * 
 * @returns {object} The updated created genre
 */
module.exports.updateGenre = async (req, res) => {
    try {

        let {genreId, updates} = req.body;
        
        let updatedGenre = await updateItem(Genres, {_id: genreId}, updates);
        
        if(!updatedGenre.success) res.status(500).send({success: false, error: "Error updating item in database"});

        res.status(201).send({success: true, result: updatedGenre.result});

    }

    catch(updateItemError) {
        res.status(500).send({success: false, error: `Error updating item in database. Error: ${updateItemError}`});
    }

}

/**
 * @description Deletes an already existing genre. Expects the genre ID in request parameters as ```genreId```.
 * 
 * @returns {object} The deleted genre
 */
module.exports.deleteGenre = async (req, res) => {
    try {

        let genreId = req.params.genreId;
        
        let deletedGenre = await deleteItem(Genres, {_id: genreId});
        
        if(!deletedGenre.success) res.status(500).send({success: false, error: "Error deleting item from database"});

        res.status(201).send({success: true, result: deletedGenre.result});

    }

    catch(deleteItemError) {
        res.status(500).send({success: false, error: `Error deleting item from database. Error: ${deleteItemError}`});
    }

}