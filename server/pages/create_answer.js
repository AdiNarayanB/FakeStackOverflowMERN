const Answer = require('../models/answerSchema'); // Import the Tag model

exports.createAndInsertAnswers = async (ansText) => {
  console.log("answer text to be inserted in db", ansText);
  try {
    const answerObjects = answerObjects.map((name) => ({ name }));
    // Create instances of Tag model for each tag object and save them
    const savedAnswers = await Answer.insertMany(answerObjects );
    console.log("after answer promise is complete", savedAnswers);
    return savedAnswers; // Return the saved tags
  } catch (error) {
    throw new Error(`Error while creating tags: ${error.message}`);
  }
};