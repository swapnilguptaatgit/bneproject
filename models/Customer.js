//signup_customer
const mongoose = require('mongoose');
const {Schema} = mongoose;

const customerSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:false,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    phone_num:{
        type:Number,
        require:true,
        unique:true
    },
    Address:{
        type:String,
        require:true
    }
})
const Customer = mongoose.model('Customer',customerSchema);
module.exports = Customer;