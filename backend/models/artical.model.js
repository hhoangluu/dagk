var mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and model

const bongdaSchema = new Schema({
    name: String
})

const bongdaSchema = mongoose.model('Bongda', bongdaSchema);

module.exports = bongdaSchema;