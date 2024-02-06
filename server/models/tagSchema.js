const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  tid: {type:mongoose.Schema.Types.ObjectId, required: false},
  name:{type: String, required: true },
});



// const  = mongoose.models.questionSchema || mongoose.model('Question', questionSchema)
//Export model
module.exports = mongoose.model('Tag', tagSchema);

