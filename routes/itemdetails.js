const express = require('express');
const { query, validationResult, body} = require('express-validator');
 const router = express.Router();

const Items = require('../models/Item');

//Route3 details of the product
router.post('/EnterDetails',[
    body('person_size').isLength({min:2}),
    body('venue').isLength(),
     body('categories').isLength(),
     body('event').isLength(),
     body('budget').isLength()

    ],
    async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()});
        }
        try{
             let Item = await Items.create({
            person_size:req.body.person_size,
            venue:req.body.venue,
            categories:req.body.categories,
            event:req.body.event,
            budget:req.body.budget
        })
        const data={
            Item:{id:Item.id}
        }
        let success = true;
        res.json({data,success});
    }
        catch(error){
            console.error(error.message);
            res.status(500).send("some error occured")
        }
    })
    module.exports=router 