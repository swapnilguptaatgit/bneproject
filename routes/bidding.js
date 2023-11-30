const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const Bid = require('../models/Bid');
const router = express.Router();

app.use(bodyParser.json());

//Route1 Create a new bid
router.post('/bids', async (req, res) => {
    try {
        const { EventId, VendorName, BidAmount, Message } = req.body;
        const newBid = new Bid({ EventId, VendorName, BidAmount, Message });
        const savedBid = await newBid.save();
        console.log('Bid saved successfully:', savedBid);
        res.json({ success: true, bid: savedBid });
    } catch (err) {
        console.log('Error saving bid:', err);
        res.status(500).json({ success: false, error: 'Error saving bid' });
    }
});

//Route2 Get all bids for a specific event
router.get('/bids/:EventId', async (req, res) => {
    try {
        const EventId = req.params.EventId;
        const bids = await Bid.find({ EventId });
        res.status(200).json(bids);
    } catch (err) {
        console.log('Error fetching bids:', err);
        res.status(500).json({ error: 'Error fetching bids' });
    }
});
//Route3 Get all bids for a specific event, sorting so that top-level bids come first
router.get('/bids/:EventId', async (req, res) => {
    try {
        const EventId = req.params.EventId;
        const bids = await Bid.find({ EventId }).sort({ isTopLevel: -1 });
        res.status(200).json(bids);
    } catch (err) {
        console.log('Error fetching bids:', err);
        res.status(500).json({ error: 'Error fetching bids' });
    }
});

module.exports = router;
