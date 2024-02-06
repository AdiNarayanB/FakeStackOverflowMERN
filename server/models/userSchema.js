var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;
 
var userprofileSchema = new Schema(
  {
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, minLength: 1},
    rep: {type: Number, required: true, minLength: 1},
    memberJoinDate: {type: Date, default: Date.now},
  }
);
 
userprofileSchema.virtual('membershipTime').get(function() {
  let membershipTime_calculation = 0;
  if (this.memberJoinDate) {
    const currentDate = new Date();
    const joinDate = this.memberJoinDate;
    const differenceInMilliseconds = currentDate - joinDate;
    const millisecondsInADay = 1000 * 60 * 60 * 24; // Number of milliseconds per day
    membershipTime_calculation = Math.floor(differenceInMilliseconds / millisecondsInADay);
  }
  return  membershipTime_calculation;
});
 
module.exports = mongoose.model('User', userprofileSchema);