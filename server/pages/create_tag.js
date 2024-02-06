const Tag = require('../models/tagSchema'); // Import the Tag model

exports.createAndInsertTags = async (tagNames) => {
  console.log("tags create and Insert Tags", tagNames);
  try {
    const tagObjects = tagNames.map((name) => ({ name }));

    // Create instances of Tag model for each tag object and save them
    const savedTags = await Tag.insertMany(tagObjects);
    console.log("after saved", savedTags);
    return savedTags; // Return the saved tags
  } catch (error) {
    throw new Error(`Error while creating tags: ${error.message}`);
  }
};




