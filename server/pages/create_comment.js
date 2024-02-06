const Comment = require('../models/commentSchema'); // Import your Question model


exports.new_comment = async (res,text, askedBy) => {
  
  
  try {
  
    // Assuming tags are directly used here; adjust this logic if necessary
  
    let comment = new Comment({
      
      text: text,
      commentedBy: askedBy,
      commentDate: new Date(),
      commentVotes:0
    });

    const savedComment = await comment.save();
    
    console.log("THE OBJECT ID OF THE COMMENT", savedComment._id);
    return savedComment
  } catch (error) {
    console.error('Error creating a new comment:', error);
    throw error; // Propagate the error to handle it at a higher level
  }
};
