import React, { useState } from 'react';
import { ValidationFactory } from './ValidationFactory';
import axios from 'axios';

export default function NewQuestion(props) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [askedBy, setAskedBy] = useState('');
  const [tags, setTags] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  

  function validateInputAndGetMessage(title, text, askedBy, tags) {
    
    const validationFactory = new ValidationFactory();
    const validationInstance = validationFactory.createValidation("question", title, text, tags);
    return validationInstance.validate();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationMessage = validateInputAndGetMessage(title, text, askedBy, tags.split(' ').map(tag => tag.trim()));

    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }
    
    try {
      // Make a POST request to the server to add a new question
      const askedBy = props.username;
      const response = await axios.post('http://localhost:8000/newquestion', {
        title,
        votes:0,
        text,
        askedBy,
        tags: tags.split(' ').map(tag => tag.trim()),
      });
      if (response.data.status === 'repTooLow')
      {
       setErrorMessage('Rep Too Low');
       return;
      }
      
      
      if (response.data.status === 'success') {
      console.log(response);
      let nQuestion = response.data.question;
      nQuestion['qid'] = nQuestion._id;
      props.onQuestionSubmit(nQuestion);
      // Clear the form fields
      setTitle('');
      setText('');
      setAskedBy('');
      setTags('');
      setErrorMessage('');
      
      // Add the new question to the state only if it's not a duplicate
      
      if(!response.data.message === "duplicate")
      
      {
        const newQuestion = response.data.question;
        console.log("the new question is");
        newQuestion.qid = newQuestion._id;
        console.log(newQuestion);
        props.onQuestionSubmit(newQuestion);
      }
      
      else
      {
       props.onQuestionSubmit("na");
      }
    } 
    }
   catch (error) {
    console.error('Error adding question:', error);
    setErrorMessage('Failed to add the question. Please try again.');
  }
  };

  return (

	<div>
    <form onSubmit={handleSubmit}>
      <h2>Add a Question</h2>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="formTitleInput"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        
      /><br /><br />

      <label htmlFor="text">Question Text:</label><br />
      <textarea
        id="formTextInput"
        name="text"
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        
      ></textarea><br /><br />

      
      <label htmlFor="tags">Tags (comma-separated):</label>
      <input
        type="text"
        id="formTagInput"
        name="tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        
      /><br /><br />

      <input type="submit" id = 'postQuestionBtn' value="Post Question" />
    </form>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}
