const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Tag = require('./tagSchema');    // Reference to the Tag schema
const Answer = require('./answerSchema');  // Reference to the Answer schema


const questionSchema = new Schema({
  qid: {type: String, required: false},
  title: {type: String, required: true},
  summTitle: {type: String, required: false},
  pinnedAid: {type: String, required: false},
  votes:{type:Number,required:false},
  text: {type: String, required: true},
  tagIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],  // Reference to the Tag schema
  askedBy: {type: String, required: true},
  askDate: {type: Date, required: true},
  ansIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],  // Reference to the Answer schema
  views: {type: Number, required: false },
});


questionSchema.virtual('edtAskDate').get(function () {
  const utcAskDate = this.askDate;
  const edtOffset = -4; 
  const edtAskDate = new Date(utcAskDate.getTime() + edtOffset * 60 * 60 * 1000);
  
  return edtAskDate;
});

// Ensure virtuals get included when converting to JSON
questionSchema.set('toJSON', {virtuals: true });


// const Question = mongoose.model('Question', questionSchema);

//Export model
module.exports = mongoose.model('Question', questionSchema);



