const mongoose = require('mongoose');
const {Schema} = mongoose;

const itemSchema = new Schema({
    person_size:{
        type:String,
        require:true
    },
    venue:{
        type:String,
        require:true
    },
    categories:{
        type:String,
        require:true
    },
    event:{
        type:String,
        required:true
    },
    budget:{
        type:Number,
        require:true
    }
})

const Item = mongoose.model('Item',itemSchema);
module.exports = Item;