const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    uniqueId:{type : String},
    isbn : {type : String},
    title :{type:String},
    author:{type : String},
    description:{type : String},
    date:{type: Date},
    publisher:{type : String}
})
const book_store = mongoose.model('bookStore',bookSchema);

module.exports = book_store;