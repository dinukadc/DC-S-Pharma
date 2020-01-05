const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sampath = new Schema({
    amount:{
        type:String,
        require:true
    },
    holdersName:{
        type:String,
        require:true
    },
    creditCardNo:{
        type:String,
        require:true
    },
    cvc:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    }

});

mongoose.model('sampath',Sampath);
module.exports = mongoose;