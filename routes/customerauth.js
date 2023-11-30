const express = require('express');
const { query, validationResult, body} = require('express-validator');
 const router = express.Router();
const Customer = require('../models/Customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const fetchcustomer = require('../MiddleWare/fetchcustomer');
 const jwt_secret = "qwerty_divyashunk";

//Route1 signup..../api/customerauth/Createcustomer no login require
router.post('/CreateCustomer',[
     body('name').isLength({min:5}),
    body('email').isEmail(),
     body('password').isLength({min:5}),
     body('phone_num').isLength({min:10}),
     body('address').isLength({min:10})
 ],
     async (req,res)=>{
        let success=false;
         const errors = validationResult(req);
         if(!errors.isEmpty()){
             return res.status(400).json({error:errors.array()});
         }
         //check if email exist
         try{
             let customer = await Customer.findOne({email:req.body.email});
             if(customer){
                 return res.status(400).json({success,error:"Sorry the name the same name and email ID exist"});
             }
             const salt = await bcrypt.genSalt(10);
              const secPass = await bcrypt.hash(req.body.password,salt);
             //create a new customer
             customer = await Customer.create({
                 name:req.body.name,
                 email:req.body.email,
                 password:secPass,
                 phone_num:req.body.phone_num,
                 Address:req.body.Address
             })
             
             const data = {
                  customer:{
                      id:customer.id
                  }
              }
              const Authtoken = jwt.sign(data, jwt_secret);
              success = true;
              res.json({success,Authtoken});
         }
         catch(error){
             console.error(error.message);
             res.status(500).send("some error occured");
         }
     }
 )
 //Route2:Login a customer using:Post "/api/customerauth/Logincustomer",login require
 router.post('/Logincustomer',[ 
    body("email","enter the valid email").isEmail(),
    body("password","Password cannot be blank").exists(),
    
],async (req,res)=>{
    let success =false;
    console.log(req)
    //validation using express validator for data validation such as redundant emails,phone number
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()});
  }
  const {email,password}= req.body;
  try{
    let customer=await Customer.findOne({email});
    if(!customer){
      return res.status(400).json("please enter the write credentials")
    }
    const passwordcompare=await bcrypt.compare(password,customer.password);
    if(!passwordcompare){
    return res.status(400).json({success,error:"please enter the write credentials"})}
    const data={
        customer:{id:customer.id}
    }
    const AuthToken=jwt.sign(data,jwt_secret);
      success=true;
      res.json({success,AuthToken}) 
}
catch(error){
  console.error(error.message);
  res.status(500).send("some error occured")
}

});
module.exports=router 