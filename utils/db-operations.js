const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI || 'mongodb://127.0.0.1:27017/netflixClone', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false });

module.exports.getAllItems = (collection, projection = {}) => {
    return new Promise(async (resolve, reject) => {

        collection.find({}, projection)
            .then(allItems => resolve({success: true, result: allItems}))
            .catch(findAllError => reject({success: false, error: findAllError}));
    })
}


module.exports.getOneItem = (collection, filter, projection = {}) => {
    return new Promise(async (resolve, reject) => {

        collection.findOne(filter, projection)
            .then(item => resolve({success: true, result: item}))
            .catch(findOneError => reject({success: false, error: findOneError}));
    })
}

module.exports.addItem = (collection, itemData) => {
    return new Promise(async (resolve, reject) => {

        collection.create(itemData)
            .then(addedItem => resolve({success: true, result: addedItem}))
            .catch(addItemError => reject({success: false, error: addItemError}));

    });
}

module.exports.updateItem = (collection, filter, updates) => {
    return new Promise(async (resolve, reject) => {

        collection.findOneAndUpdate(filter, updates)
            .then(updatedItem => resolve({success: true, result: updatedItem}))
            .catch(updateError => reject({success: false, error: updateError}));

    });
}


module.exports.deleteItem = (collection, filter) => {
    return new Promise(async (resolve, reject) => {

        collection.findOneAndDelete(filter)
            .then(deletedItem => resolve({success: true, result: deletedItem}))
            .catch(deleteError => reject({success: false, error: deleteError}));

    });
}