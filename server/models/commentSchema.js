const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
  cid: {type: String, required: false},
  text: {type: String, required: true},
  commentedBy: {type: String, required: true},
  commentDate: {type: Date, required: true},
  commentVotes: {type: Number, required:true},
});


commentSchema.virtual('edtCommentDate').get(function () {
  const utcCommentDate = this.commentDate;
  const edtOffset = -4; 
  const edtCommentDate = new Date(utcCommentDate.getTime() + edtOffset * 60 * 60 * 1000);
  
  return edtCommentDate;
});

// Ensure virtuals get included when converting to JSON
commentSchema.set('toJSON', {virtuals: true });

//Export model
module.exports = mongoose.model('Comment', commentSchema);




