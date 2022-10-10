const mongoose = require('mongoose');
const {Types} = mongoose
const tripSchema = new mongoose.Schema({
  tripName:{
    type: String,
    required: [true, 'Please enter a trip name'],
  }, 
  userId :{
    type: Types.ObjectId,
    ref: "user",
    default: null
  },
  peopleData:[
    {
        type: String
    }
  ]
});

const Trip = mongoose.model('trip', tripSchema);

module.exports = Trip;