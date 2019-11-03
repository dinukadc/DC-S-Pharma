const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Payment = new Schema({
   amount:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    userid:{
       type:String,
        require:true
    }
});

mongoose.model('Payment', Payment);
module.exports = mongoose;