import React, { useState } from 'react';
// import Banner from "./banner";
// import Navbar from "./navbar";
import Header from "./header";
import UserHeader from './header_user';
import UserAnswer from './Answer_user_comp';
import {UserProfile} from './UserProfile';
import Sidebar from "./sidebar";
import UserTagList from "./tagList_user_comp"; // Import the TagList component
import TagList from './tagList_user_comp';
import '../stylesheets/index.css';



export default function FakeStackOverflow({user,sessionId, onLogOutClick}) {

  const [showHeader, setShowHeader] = useState(true);
  const [linkClicked, setLinkClicked] = useState(true);
  const [clickedQuestion, setClickedQuestion] = useState(null);
  // const [userProfileLinkClicked,setUserProfileLinkClicked] = useState(false);
  // console.log(userProfileLinkClicked);
  const [userTags, setUserTags] = useState(false);
  const [userQuestions, setUserQuestions] = useState(false);
  const [userAnswers, setUserAnswers] = useState(false);
 
  
  console.log("user questions state change", userQuestions)
  console.log(userTags);
  console.log(setUserAnswers);
  console.log(userAnswers);
  const [currentUserForm, setCurrentUserForm] = useState("");

  const handleUserPageChange = (formType) => {
    console.log("formType",formType);
    setCurrentUserForm(formType);
  };

  console.log("Session for user:" + user);
  console.log("Session for sid:" + sessionId);


  
  return (
    <div>
      {currentUserForm === 'profile' ? (
        <UserProfile 
          onFormChange={handleUserPageChange}
          user={user} 
          setUserTags={setUserTags}
          setUserQuestions={setUserQuestions}
          setUserAnswers={setUserAnswers}
        />
      ) : currentUserForm === 'questions' ? (
        <UserHeader 
          user={user} 
          sessionId={sessionId} 
          onLogOutClick={onLogOutClick} 
          clickedQuestion={clickedQuestion} 
          setClickedQuestion={setClickedQuestion} 
          linkClicked={linkClicked} 
          onFormChange={handleUserPageChange}
          setLinkClicked={setLinkClicked}
        />
      ) : currentUserForm === 'tags' ? (
        <UserTagList
         user={user}  />
      ) : currentUserForm === 'answers' ? (
        < UserAnswer  user={user} />
      ) : (
        <div style={{ display: 'flex' }}>
          <Sidebar 
            setShowHeader={setShowHeader} 
            setLinkClicked={setLinkClicked}  
            setClickedQuestion={setClickedQuestion} 
            onFormChange={handleUserPageChange}
            user={user}
          />
          <div className="main">
            {showHeader ? (
              <Header 
                user={user} 
                sessionId={sessionId} 
                onLogOutClick={onLogOutClick} 
                clickedQuestion={clickedQuestion} 
                setClickedQuestion={setClickedQuestion} 
                linkClicked={linkClicked} 
                setLinkClicked={setLinkClicked}
              />
            ) : (
              <TagList /> // Render the TagList component when showHeader is false
            )}
          </div>
        </div>
      )}
    </div>
  );
            }   
