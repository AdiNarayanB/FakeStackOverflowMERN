import React, { useEffect, useState, } from 'react';
import '../stylesheets/index.css';
import axios from 'axios';


function UserAnswer({user}) {
  const userStringId = user;
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [reformatAnswers, setReformatAnswers] = useState([]);
  const [ansBy, setAnsBy] = useState('');
  const [text, setText] = useState('');
  const [editAnswerIndex, setEditAnswerIndex] = useState(null);
  const [answerIndex, setanswerIndex] = useState(null);
 

  // Fetch reformatAnswers from API when component mounts
  useEffect(() => {
    // Example: Fetch reformatAnswers from an API endpoint
    // Replace with actual API call using fetch or axios
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/userprofile/answers/${userStringId}`);
        const filterAns = response.data.answers;
        console.log("filteredArray", filterAns);
        setReformatAnswers(filterAns);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once on mount

  const handleAnswerDelete = async () => {
    console.log("DELETE CLICKED");
    const updatedAnswers = [...reformatAnswers];
    console.log("updated answers in delete handle", updatedAnswers);
    // setAnsBy(answerToDelete.ansBy);
    // setText(answerToDelete.text);
    const deleteId = updatedAnswers[answerIndex].aid;
    // setShowAnswerForm(false);
    //Insert API that deletes the answer from the database
    const response = await axios.delete(`http://localhost:8000/userprofile/deleteAnswer/${userStringId}/${deleteId}`, {
      text,
    });
    console.log(response);
    const Refetchedresponse = await axios.get(`http://localhost:8000/userprofile/answers/${userStringId}`);
    const filterAnsNew = Refetchedresponse.data.answers;
    setReformatAnswers(filterAnsNew);
    console.log(Refetchedresponse);
    setShowAnswerForm(false);
  }

  const handleAnswerEdit = (index) => {
    const answerToEdit = reformatAnswers[index];
    setanswerIndex(index);
    setAnsBy(answerToEdit.ansBy);
    setText(answerToEdit.text);
    setEditAnswerIndex(index);
    setShowAnswerForm(true);
  };

  const handleAnswerSubmit =  async () => {
    if (editAnswerIndex !== null) {
      const updatedAnswers = [...reformatAnswers];
      updatedAnswers[editAnswerIndex] = { ...updatedAnswers[editAnswerIndex], ansBy, text };
      const updateId = updatedAnswers[editAnswerIndex].aid;
      console.log(updateId)
      console.log("the index of this answer", editAnswerIndex);
      setReformatAnswers(updatedAnswers);
      setEditAnswerIndex(null);
      setShowAnswerForm(false);
      //Insert API that updates the question based on the question and the user
      const response = await axios.post(`http://localhost:8000/userprofile/updateAnswer/${userStringId}/${updateId}`, {
        text,
      });

      console.log('Answer post Response:', response.data); // Log the response data
      setAnsBy('');
      setText('');
    }
  };

  return (
    <div>
      {showAnswerForm ? (
        <div>
          <input
            type="text"
            id="answerUsernameInput"
            placeholder="Your username"
            value={ansBy}
            onChange={(e) => setAnsBy(e.target.value)}
          />
          <textarea
            placeholder="Your answer..."
            value={text}
            id="answerTextInput"
            onChange={(e) => setText(e.target.value)}
          />
          <button id="updateAnswer" onClick={handleAnswerSubmit}>Update Answer</button>
          <button onClick={() => setShowAnswerForm(false)}>Cancel</button>
          <button id="deleteAnswer" onClick={() => handleAnswerDelete()}>
              Delete
            </button>
        </div>
      ) : (
        <div >
          <div className='welcome-header'>all answers posted by {user} </div>
          <ul  >
            {reformatAnswers
              .sort((a, b) => new Date(b.ansDate) - new Date(a.ansDate))
              .map((answer, aid) => (
                <li  key={aid} onClick={() => handleAnswerEdit(aid)}>
                  <a id="user-profile-answers" href={`#answer_${aid}`} className="styled-link">
                    {answer.text.substring(0, Math.min(answer.text.length, 50))}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserAnswer;

  

