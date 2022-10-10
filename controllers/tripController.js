const Trip = require("../models/Trip");
const Event = require("../models/Event");
const jwt = require('jsonwebtoken');
const {getUserId} = require('../helpers/authHelpers');
const {getSummary , finalReport} = require('../helpers/summary.js')
module.exports.postNewTrip = async (req, res) => {
  try {
    const { tripName, peopleData } = req.body
    const token = req.cookies.jwt;
    const userId = await getUserId(token);
    const trip = await Trip.findOne({userId : userId,tripName: tripName});
    if(trip){
        res.send("Enter new Trip name")
    }else{
        Trip.create({
            tripName,
            peopleData,
            userId
        });
        res.send("Trip Created Succesfully")
    }
  }
  catch(err) {
    res.status(400).json("Error at creating new Trip");
  }
 
}

module.exports.getTripSummary = async(req,res)=>{
  try{
    const tripId = req.params.tripId;
    const token = req.cookies.jwt;
    const userId = await getUserId(token);
    // console.log(userId);
    const allEvents = await Event.find({ 
      userId : userId,tripId : tripId
    })
    // console.log("all events",allEvents);

    const {peopleData} = await Trip.findOne({_id:tripId,userId:userId});
    // console.log(peopleData);

    let amountData = [],peopleIdx = {};
    for(let i=0; i<peopleData.length; ++i){
      const name = peopleData[i];
      amountData.push({name: name, amount: 0});
      peopleIdx[name] = i;
    }
    // console.log(amountData,peopleIdx)

    for(let i=0; i<allEvents.length; ++i){
      currEvent = await getSummary(allEvents[i]);
      // console.log(currEvent);

      for(let j=0;j<currEvent.length; ++j){
        const {peopleName,amountPaid,present} = currEvent[j];
        const idx = peopleIdx[peopleName] ;
        if(present === false)continue;
        amountData[idx].amount = parseFloat(amountData[idx].amount) + parseFloat(amountPaid);
        // console.log(peopleName,amountPaid,idx);
      }

    }
    const report = await finalReport(amountData);
    res.status(201).json({report});
  }
  catch(err) {
    res.status(400).json("Error at creating summary");
  }
}