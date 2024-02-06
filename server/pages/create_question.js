const Question = require('../models/questionSchema'); // Import your Question model
const { createAndInsertAnswers } = require('./create_answer');
const { createAndInsertTags } = require('./create_tag');

exports.new_question = async (res, title, text, askedBy, tags) => {
  console.log("tags in new question 1", tags);
  //here, add a condition that gets the user, and checks the rep, and then only adds the tags if rep > 50
  
  let tag = await createAndInsertTags(tags);
  // let answer = await createAndInsertAnswers(ansText); //Needs to be changed
  console.log("tags in new question 2")
  try {
    console.log("tags", tags);

    // Assuming tags are directly used here; adjust this logic if necessary
  
    let question = new Question({
      title: title,
      text: text,
      askedBy: askedBy,
      askDate: new Date(),
      tagIds: tag,
      votes:0,
      views:0,
      lastUpdated: new Date(),
    });

    const savedQuestion = await question.save();
    console.log('New question saved:', savedQuestion);
    console.log("THE OBJECT ID OF THE QUESTION", savedQuestion._id);
    return savedQuestion;
  } catch (error) {
    console.error('Error creating a new question:', error);
    throw error; // Propagate the error to handle it at a higher level
  }
};


