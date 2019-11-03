const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Prescription = new Schema({
    name:{
        type:String,
        require:true
    },
    package:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    }
});

mongoose.model('Prescription', Prescription);
module.exports = mongoose;