const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
    name:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    mobileNo:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    loyalityPoints:{
        type:String,
        require:true
    }
});

mongoose.model('Customer', Customer);
module.exports = mongoose;