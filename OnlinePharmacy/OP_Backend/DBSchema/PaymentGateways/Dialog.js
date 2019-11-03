const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dialog = new Schema({
    amount:{
        type:String,
        require:true
    },
    phoneNo:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    pin:{
        type:String,
        require:true
    }
});

mongoose.model('dialog',Dialog);
module.exports = mongoose;