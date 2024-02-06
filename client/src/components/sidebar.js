import React, { useState,useEffect } from 'react';

export default function Sidebar({setClickedQuestion, setShowHeader,setLinkClicked, onFormChange, user}) {

  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (user === 'guest' || user === 'Guest') {
      setIsRegistered(false);
    } else {
      setIsRegistered(true);
    }
  }, [user]);



  const handleTagsClick = () => {
    setShowHeader(false); // Set the state to hide the Header component
  };

  const handleQuestionsClick = () => {
    console.log('questions link clicked');
    setLinkClicked(true);
    setClickedQuestion(null);
    setShowHeader(true); // Set the state to show the Header component
  };

  return (
    <div>
      <div className="side-bar" id="sideBarNav">
        <a href="#Questions">
          <div
            style={{ marginLeft: '100px', fontFamily: 'Helvetica', paddingTop: '10px', paddingBottom: '20px' }}
            onClick={handleQuestionsClick}
          >
            Questions
          </div>
        </a>
        <a href="#Tags">
          <div
            style={{ marginLeft: '100px', fontFamily: 'Helvetica', paddingBottom: '20px' }}
            onClick={handleTagsClick}
          >
            Tags
          </div>
        </a>
        {isRegistered ? (
          <a href="#UserProfile">
            <div
              style={{ marginLeft: '100px', fontFamily: 'Helvetica', paddingTop: '10px', paddingBottom: '20px' }}
              onClick={() => onFormChange('profile')}
            >
              UserProfile
            </div>
          </a>
        ) : (
          null
        )}
      </div>
    </div>
  );
}


