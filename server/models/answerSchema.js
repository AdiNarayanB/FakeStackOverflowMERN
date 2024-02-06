// Answer Document Schema
// models/answers.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const answerSchema = new Schema({
  aid: {type:mongoose.Schema.Types.ObjectId, required: false},
  ansBy: {type: String, required: true},
  text: {type: String, required: true},
  votes: {type:Number, required: false},
  cIds: [{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}],
  ansDate: {type: Date, required: true},

});

//Export model
module.exports = mongoose.model('Answer', answerSchema);




