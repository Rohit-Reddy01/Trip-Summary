const Event = require("../models/Event");
const {getUserId} = require('../helpers/authHelpers');
module.exports.postNewEvent = async (req, res) => {
  try {
    console.log(req.body)
    const { tripId, amountData , eventName } = req.body
    const token = req.cookies.jwt;
    const userId = await getUserId(token);
    const event = await Event.findOne({userId : userId,tripId: tripId,eventName: eventName});
    // console.log(event);
    if(event){
        res.send("Enter new event name")
    }else{
        Event.create({
            eventName,
            amountData,
            userId,
            tripId
        });
        res.send("Event Created Succesfully")
    }
  }
  catch(err) {
    res.status(400).json("Error at creating new Event");
  }
}