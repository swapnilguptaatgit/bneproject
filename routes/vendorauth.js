const express = require('express');
const { query, validationResult, body} = require('express-validator');
 const router = express.Router();
const Vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchvendor = require('../MiddleWare/fetchvendor');
 const jwt_secret = "qwerty_divyashunk";

//Route1 signup..../api/vendorauth/CreateVendor no login require
router.post('/CreateVendor',[
     body('name').isLength(),
     body('email').isEmail().withMessage("Invalid email"),
     body('password').isLength(),
     body('phone_num').isLength({required:10}),
     body('Gst_Number').isLength({required:15}),
     body('Shop_number').isLength()
 ],
     async (req,res)=>{
        let success=false;  
         const errors = validationResult(req);
        
         if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()});
          }
         //check if email exist
        
         try{
             let vendor = await Vendor.findOne({email:req.body.email});
             if(vendor){
                 return res.status(400).json({success,error:"Sorry the name the same name and email ID exist"});
             }
             const salt = await bcrypt.genSalt(10);
              const secPass = await bcrypt.hash(req.body.password,salt);
             //create a new vendor
             vendor = await Vendor.create({
                 name:req.body.name,
                 email:req.body.email,
                 password:secPass,
                 phone_num:req.body.phone_num, 
                 Gst_Number:req.body.Gst_Number,
                 Shop_number:req.body.Shop_number
             })
             
             
             const data = {
                  vendor:{
                      id:vendor.id
                  }
              }
             
              const Authtoken = jwt.sign(data, jwt_secret);
              success = true;
              res.json({success,Authtoken});
         }
         catch(error){
            
             res.status(500).send("some error occured");
         }
     }
 )
 //Route2:Login a vendor using:Post "/api/vendorauth/LoginVendor",login require
 router.post('/LoginVendor',[ 
    body("email","enter the valid email").isEmail(),
    body("password","Password cannot be blank").exists(),
],async (req,res)=>{
    let success =false;
    

    //validation using express validator for data validation such as redundant emails,phone number
    const errors = validationResult(req);
   
  if (!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()});
  }
  const {email,password}= req.body;
  try{
    let vendor=await Vendor.findOne({email});
    if(!vendor){
      return res.status(400).json("please enter the write credentials")
    }
    const passwordcompare=await bcrypt.compare(password,vendor.password);
    if(!passwordcompare){
    return res.status(400).json({success,error:"please enter the write credentials"})}
    const data={
        vendor:{id:vendor.id}
    }
    const AuthToken=jwt.sign(data,jwt_secret);
      success=true;
      res.json({success,AuthToken}) 
}
catch(error){
 
  res.status(500).send("some error occured")
}

});

module.exports=router 