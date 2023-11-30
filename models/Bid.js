const mongoose = require('mongoose');
const {Schema} = mongoose;

const BidSchema = new Schema({
    EventId:{
        type:mongoose.Schema.Types.ObjectId,
        default:()=> new mongoose.Types.ObjectId(),
    },
    VendorName:{
        type:String,
        require:true
    },
    BidAmount:{
        type:String,
        require:true
    },
    Message:{
        type:String,
        require:true
    }
})

const Bid = mongoose.model('Bid',BidSchema);
module.exports = Bid;