const mongoose = require('mongoose');
const {Types} = mongoose
const eventSchema = new mongoose.Schema({
  eventName:{
    type: String,
    required: [true, 'Please enter a Event name'],
  }, 
  userId :{
    type: Types.ObjectId,
    ref: "user",
    required: true
  },
  tripId:{ 
    type: Types.ObjectId,
    ref:"trip",
    required : true
  },
  amountData:[
    {
        type: {
          peopleName : {
            type: String
          }, 
          amountPaid: {
            type: String
          }, 
          present:{
            type: Boolean
          }
        }
    }
  ]
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;