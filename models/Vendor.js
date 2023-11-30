//signup_vendor
const mongoose=require('mongoose');
const {Schema} = mongoose;

const vendorSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    phone_num:{
        type:Number,
        require:true
    },
    Shop_number:{
        type:Number,
        require:true
    },
    Gst_Number:{
        type:Number,
        require:true
    }
})
const Vendor = mongoose.model('Vendor',vendorSchema);
module.exports = Vendor;