const { Genres } = require("../Genres/genre-model");

const {getAllItems, getOneItem, addItem, updateItem, deleteItem} = require("../utils/db-operations");



module.exports.getGenreList = async (req, res) => {

    try {
        
        let allGenres = await getAllItems(Genres);
        
        if(!allGenres.success) res.status(500).send({success: false, error: "Error getting info from database"});

        res.status(201).send({success: true, result: allGenres.result});

    }

    catch(getAllError) {
        res.status(500).send({success: false, error: `Error getting info from database. Error: ${getAllError}`});
    }

    finally {
        //Do something
    }
}

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

    finally {
        //Do something
    }
}


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

    finally {
        //Do something
    }
}


module.exports.updateGenre = async (req, res) => {
    try {

        let {genreId, updates} = req.body.genreId;
        
        let updatedGenre = await updateItem(Genres, {_id: genreId}, updates);
        
        if(!updatedGenre.success) res.status(500).send({success: false, error: "Error updating item in database"});

        res.status(201).send({success: true, result: updatedGenre.result});

    }

    catch(updateItemError) {
        res.status(500).send({success: false, error: `Error updating item in database. Error: ${updateItemError}`});
    }

    finally {
        //Do something
    }
}


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

    finally {
        //Do something
    }
}