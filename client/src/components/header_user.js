import React, { useEffect, useState } from 'react';
import '../stylesheets/index.css';
import NewQuestion from './NewQuestion';
import UserQuestion from "./question_user_comp";
import UserBanner from "./banner_user.js";
import Navbar from './navbar';



// import {Welcome} from './Welcome';
import axios from 'axios';

//ADD SESSION AND USER
export default function UserHeader({user, linkClicked, onLogOutClick,clickedQuestion,setClickedQuestion}) {
  
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [title,setTitle] = useState('All Your Questions')
  const [showactiveSortText, setShowactiveSortText] = useState(false);
  const [shownewestsortText, setShownewestSortText] = useState(false);
  const [showunansweredSortText, setShowunansweredSortText] = useState(false);
  const [showunansweredCount, setShowunansweredCount] = useState(false);
  const [userIdentification, setuserIdentification] = useState(null);
  const [clickedQuestionId,setClickedQuestionId] = useState(null);
  const [text,setText] = useState('');
  const [askedby,setAskedBy] = useState('');


  
 
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // const userString = JSON.stringify(user);
        // console.log("THE USER STRING BEFORE API CALL", userString);
        const userName = user; 
        console.log("userName", user);
        const response = await axios.get(`http://localhost:8000/userprofile/metrics/${userName}`); // Replace with your backend API endpoint
        //User Metrics provided by the data base
        console.log("the api response", response);
        console.log("the member join data response response",response.data.memberJoinDate);
        console.log("the user rep response ", response.data.rep);
        setuserIdentification(user);
        console.log(userIdentification);
        console.log("PROPER DAYS CONVERSION");
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

 
  const [filterText, setFilterText] = useState('');
  const handleFilterTextChange = (newFilterText) => {
       setFilterText(newFilterText);
  };

  const [data, setData] = useState({
    questions: [],
    tags: [],
    answers: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getData'); //NEED TO CHANGE: What does this do?
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
       setQuestions(data.questions.push(nQuestion));
    }
    console.log("the new data is is");
    
    
    
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
  const handleQuestionClick = async (qid) => {
    
    console.log("INSIDE UPDATE CLICK FUNCTION");
    for (let i = 0; i < data.questions.length; i++) {
      if (data.questions[i]['qid'] === qid) {
        const clicked = data.questions[i];
        console.log("THE QID", qid);
        setClickedQuestion(clicked);
        setAskedBy(clicked.askedBy); 
        setClickedQuestionId(qid);
      }
      try {
        console.log("the id of the question", clickedQuestionId);
        const response = await axios.post(`http://localhost:8000/userprofile/updateQuestion/${clickedQuestionId}`, {
          text,
        });
        setClickedQuestion(false);
        console.log(linkClicked);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleQuestionDelete = async () => {
    console.log("DELETE CLICKED");
    const deleteId = clickedQuestionId;
   
    const response = await axios.delete(`http://localhost:8000/userprofile/deleteQuestion/${deleteId}`, {
      text,
    });
    console.log(response);
    setClickedQuestion(false);
  }

  return (
    <div>
      <div>
       <UserBanner 
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
        
        <div className="add-question-btn" onClick={() => setShowNewQuestion(true)}>
            Ask a Question
          </div>
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
          <NewQuestion onQuestionSubmit={handleQuestionSubmit}  />
          <button onClick={() => setShowNewQuestion(false)}>Cancel</button>
        </div>
      ) : (
        <div id="questionBody">
          {clickedQuestion ? (
            <div id = "#newQuestionsPage" >
            <div id = "#newQuestionsPage" className='page-results-title'>New Question Page</div>
             <div>
             <input
               type="text"
               id="Askedby"
               placeholder="Your username"
               value={askedby}
               onChange={(e) => setAskedBy(e.target.value)}
             />
             <textarea
               placeholder="Your Question Update..."
               id="questionTextInput"
               value={text}
               onChange={(e) => setText(e.target.value)}
             />
             <button id="UpdateQuestion" onClick={handleQuestionClick}>Update Question</button>
             <button onClick={() => setClickedQuestion(false)}>Cancel</button>
             <button id="DeleteQuestion" onClick={() => handleQuestionDelete()}>
                 Delete
               </button>
               </div>
           </div>
    
          ) : (
            <UserQuestion 
             id="questionBody" 
             userIdentification={user}
             props = {data}
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

