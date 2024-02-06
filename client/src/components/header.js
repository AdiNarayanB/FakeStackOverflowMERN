import React, { useEffect, useState } from 'react';
import '../stylesheets/index.css';
import NewQuestion from './NewQuestion';
import Question from "./question_comp_1";
import Banner from "./banner";
import Navbar from './navbar';
import Answer from './Answer';
// import {Welcome} from './Welcome';
import axios from 'axios';

//ADD SESSION AND USER
export default function Header({user, linkClicked, onLogOutClick,clickedQuestion,setClickedQuestion}) {
  
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [questions, setQuestions] = useState([]);
  //const [clickedQuestion, setClickedQuestion] = useState(null);
  const [title,setTitle] = useState('All Questions')
  const [showactiveSortText, setShowactiveSortText] = useState(false);
  const [shownewestsortText, setShownewestSortText] = useState(false);
  const [showunansweredSortText, setShowunansweredSortText] = useState(false);
  const [showunansweredCount, setShowunansweredCount] = useState(false);
  
  // const [showWelcomePage, setShowWelcomePage] = useState(false);


 
  const [filterText, setFilterText] = useState('');
  
  
  
  
  const handleFilterTextChange = (newFilterText) => {
       setFilterText(newFilterText);
  };

  const [data, setData] = useState({
    questions: [],
    tags: [],
    answers: [],
  });
  
  
  
  const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/getData');
    const sortedQuestions = response.data.questions.sort((a, b) => {
      return new Date(b.askDate) - new Date(a.askDate);
    });
    setData({
      questions: sortedQuestions || [],
      tags: response.data.tags || [],
      answers: response.data.answers || [],
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  useEffect(() => {
    

    fetchData();
  }, []); 
  useEffect(()=>{
    const handleKeyPress = (e) =>{
    if (e.key === "Enter"){
      setTitle('Search Results');
      console.log("from handle key press", e.target.value)
    }
  };
  document.addEventListener('keydown', handleKeyPress);
  return () => {
    document.removeEventListener('keydown',handleKeyPress);
  };
  },[]);
   
  // Callback function to handle the submission of a new question
  const handleQuestionSubmit =(nQuestion) => {
    
    
    
    // Add the new question to the questions array
    if (nQuestion === "na"){
      setQuestions(data.questions);	
    }
    else
    {
       nQuestion['qid'] = nQuestion._id;
       
       setQuestions(data.questions.push(nQuestion));
    }
    console.log("the new data is is");
    console.log(data);
    
    
    // Hide the new question form
    setShowNewQuestion(false);
    };


    const handleActiveClick = () =>{
      console.log("active setting complete")
      setShowactiveSortText(true);

    }

    const handleUnansweredClick = () => {
      console.log("unanswered setting complete")
      setShowunansweredSortText(true);
      setShowunansweredCount(true);
    };


    const handleNewestClick = () => {
    setShownewestSortText(true);
    };

    const handleLogoutClick = () => {
      console.log("log out clicked")
      // Call onLogOutClick function if it's defined
      if (typeof onLogOutClick === 'function') {
        onLogOutClick();
      }
    };
  
  // Callback function to handle the click on a question
  const handleQuestionClick = (qid) => {
  console.log("entering handle question click");

  // Fetch the updated data
  

    console.log("question clicked");

    // Set the updated data to the state
    
    // Find the clicked question in the updated data
    const clicked = data.questions.find((question) => question.qid === qid);
    
    console.log("this is the question passed to answers");
    console.log(clicked);
    console.log(linkClicked);

    // Set the clicked question in the state
    setClickedQuestion(clicked);
  
};
  const showAddQuestionButton = user !== 'guest';
  return (
    <div>
      <div>
       <Banner 
        user  = {user}
        filterText = {filterText}
        onFilterTextChange={handleFilterTextChange}
        />
      </div>
      <div className="page-results-title">{title}</div>
      <div className="page-count">
      {showunansweredCount ? (
        <span>
        {data.questions.filter((question) => question.ansIds.length === 0).length}{' '}
        {data.questions.length === 1 ? 'question' : 'questions'}
       </span>
        ) : (
      <span>
        {data.questions.length} {data.questions.length === 1 ? 'question' : 'questions'}
      </span>
      )}
        <div>
        {showAddQuestionButton && (
            <div className="add-question-btn" onClick={() => setShowNewQuestion(true)}>
              Ask a Question
            </div>
          )}
          <Navbar props={data} 
           onActiveClick={handleActiveClick}
           onUnansweredClick={handleUnansweredClick}
           onNewestClick={handleNewestClick}/>
        </div>
        <button className="logout-btn" onClick={handleLogoutClick}> 
            Log Out
        </button>
        </div>
      {showNewQuestion ? (
        <div>
          <NewQuestion onQuestionSubmit={handleQuestionSubmit} username = {user} />
          <button onClick={() => setShowNewQuestion(false)}>Cancel</button>
        </div>
      ) : (
        <div id="questionBody">
          {clickedQuestion ? (
            <Answer question={clickedQuestion} username = {user} onGoBack={() => setClickedQuestion(null)} />
          ) : (
            <Question 
             id="questionBody" 
             props = {data}
             username = {user}
             filterText={filterText}
             shownewestsortText={shownewestsortText} 
             showactiveSortText={showactiveSortText}
             showunansweredSortText={showunansweredSortText}
             questions={questions} 
             onQuestionClick={handleQuestionClick} 
            />
            )
          }
        </div>
      )}
    </div>
  );
}


