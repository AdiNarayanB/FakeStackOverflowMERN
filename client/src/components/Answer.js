import React, { useEffect, useState, useCallback } from 'react';
import '../stylesheets/index.css';
import { ValidationFactory } from './ValidationFactory';
import axios from 'axios';




function Answer(props) {

  
  let { question,username} = props;
  
  
  //console.log(data);
  const [data, setData] = useState({
    questions: [],
    tags: [],
    answers: [],
    comments:[],
  });
  
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [text, setText] = useState('');
  //const [ansBy, setAnsBy] = useState(''); // State for the username
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
   const [currentCommentsPage, setCurrentCommentsPage] = useState(null);
  const [commentPageIndex, setCommentPageIndex] = useState(0);
  const [commentsPerPage] = useState(3);
  const [commentText, setCommentText] = useState('');
  const [commentErrorMessage, setCommentErrorMessage] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  //const [pinnedAid,setPinnedAid] = useState('');
  
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/getData');
      console.log(response);
      
      setData({
        questions: response.data.questions || [],
        tags: response.data.tags || [],
        answers: response.data.answers.sort((a, b) => {
          return new Date(b.ansDate) - new Date(a.ansDate);
        }) || [],
        
        comments: response.data.comments.sort((a, b) => {
          return new Date(b.commentDate) - new Date(a.commentDate);
        }) || [],
      });
      //question = data.questions.find((qObj)=> qObj.qid === question.qid);
      

      
      
      

    } catch (error) {
    
      console.error('Error fetching data:', error);
    }
  }, []);
  
  useEffect(() => {
    fetchData(); // Initial data fetch
     console.log("updated data");
      console.log(data);
      //question.pinnedAid = data.answers[0].aid;
      
      const pinnedAidSearch = data.answers.find((ansObj) => ansObj.aid === question.pinnedAid);
      console.log('recent data');
      console.log(data);
      console.log(question.pinnedAid);
      console.log(question.askedBy);
      console.log(username);
      console.log(pinnedAidSearch);
    // Increment the views of the associated question in the local state by 1
    const updatedQuestions = data.questions.map((q) => {
      if (q.qid === question.qid) {
        return { ...q, views: q.views + 1 };
      }
      return q;
     
    });
    
    setData((prevData) => ({
      ...prevData,
      questions: updatedQuestions,
    }));
  }, [fetchData, question]);

  
  
  // Function to format the question timestamp
  // Function to format the question timestamp
  function validateInputAndGetMessage(answerText, username) {
    const validationFactory = new ValidationFactory();
    const validationInstance = validationFactory.createValidation("answer", answerText, username);
    return validationInstance.validate();
    
  }
  const makePinnedAnswer = async (aid, event) => {
  try {
    event.preventDefault(); // Prevent the default form submission behavior

    console.log('Entered make pinned answer with aid:', aid);
    console.log('Question:', question);
    console.log('IsPinned:', isPinned);

    // Make a POST request to update the pinned answer
    await axios.post('http://localhost:8000/updatePinned', { qid: question.qid , aid:aid });

    // Update the question state with the pinned answer
    
    question.pinnedAid = aid;

    // Set isPinned to true
    setIsPinned(true);

    // Handle success, e.g., show a success message or update the UI
  } catch (error) {
    console.error('Error pinning answer:', error);
    // Handle error, e.g., show an error message or log the error
  }
};

  
  
  
  
  const handleUpvote = (id,event,source) => {
      event.stopPropagation();
    // Implement the logic to handle upvote
    console.log(data);
    const newData = { ...data };

    // Find the index of the question with the given qid in the data state
    
      const params = {
        id: id,
       
        type: 'positive',
        username,
        source
      };

      axios
        .post('http://localhost:8000/vote', params)
        .then((response) => {
          // Handle success, update the state or perform any additional actions
          console.log('Upvote successful:', response.data);
          if (response.data.status != "reptoolow"){
          const ansIndex = newData.answers.findIndex((answer) => answer.aid === id);
          
    
    // Check if the question with the given qid is found
      if (source != 'question') {
      // Increment the votes of the question
      newData.answers[ansIndex].votes += 1;

      // Update the state with the new data
      setData(newData);
      console.log("data after upvote");
      console.log(data);
      
      } if (source==='question') 
      {
      
      const questionIndex = newData.questions.findIndex((ques) => ques.qid === question.qid) ;
      
      newData.questions[questionIndex].votes +=1; 
      setData(newData);
      question.votes+=1;
      
      }
      
      }
      
        })
        .catch((error) => {
          // Handle error
          console.error('Error upvoting' + source, error);
        });
    
  };
  
  
  const handleDownvote = (id,event,source) => {
      event.stopPropagation();
    // Implement the logic to handle upvote
    console.log(data);
    const newData = { ...data };

    // Find the index of the question with the given qid in the data state
    
      const params = {
        id: id,
       
        type: 'negative',
        username,
        source
      };

      axios
        .post('http://localhost:8000/vote', params)
        .then((response) => {
          // Handle success, update the state or perform any additional actions
          console.log('downvote successful:', response.data);
          if (response.data.status != "reptoolow"){
          const ansIndex = newData.answers.findIndex((answer) => answer.aid === id);
          
    
    // Check if the question with the given qid is found
      if (source != 'question') {
      // Increment the votes of the question
      newData.answers[ansIndex].votes -= 1;

      // Update the state with the new data
      setData(newData);
      console.log("data after upvote");
      console.log(data);
      
      } if (source==='question') 
      {
      
      const questionIndex = newData.questions.findIndex((ques) => ques.qid === question.qid) ;
      
      newData.questions[questionIndex].votes -=1; 
      setData(newData);
      question.votes-=1;
      
      }
      
      }
      
        })
        .catch((error) => {
          // Handle error
          console.error('Error upvoting' + source, error);
        });
    
  };
  
   const handleCommentUpvote = (id,event,source) => {
      event.stopPropagation();
    // Implement the logic to handle upvote
   
    const newData = { ...data };

    // Find the index of the question with the given qid in the data state
    
      const params = {
        id: id,
        source:source,
        type: 'positive',
        username,
        
      };

      axios
        .post('http://localhost:8000/vote', params)
        .then((response) => {
          // Handle success, update the state or perform any additional actions
          console.log('Upvote successful:', response.data);
          if (response.data.status != "reptoolow"){
          const commIndex = newData.comments.findIndex((comment) => comment.cid === id);
          
    
    // Check if the question with the given qid is found
    
      // Increment the votes of the question
      newData.comments[commIndex].commentVotes += 1;

      // Update the state with the new data
      setData(newData);
      console.log("data after upvote");
      console.log(data);
      
      }
        })
        .catch((error) => {
          // Handle error
          console.error('Error upvoting' + source, error);
        });
    
  };
  const renderComment = (commentId) => {
    console.log('comment is' + commentId);
    
    const comment = data.comments.find((c) => c.cid === commentId);
    if (comment) {
      return (
        <div key={comment.cid} className="comment">
          {/* Render comment content */}
          <div id = "commentBody" dangerouslySetInnerHTML={{ __html: renderLinksInText(comment.text) }}></div>
          <button id={`upvoteButtonComment-${comment.cid}`} onClick={(event) => handleCommentUpvote(comment.cid, event, "comment")}>Upvote</button>

          <div className="lastActivity">
            <div className="commentAuthor">
              Comment by: {comment.commentedBy}, Timestamp: {formatQuestionTimestamp(comment.commentDate, new Date())}
              Votes: {comment.commentVotes}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleViewComments = (answerId) => {
    setCurrentCommentsPage(answerId);
    setCommentPageIndex(0);
  };

  const handlePrevCommentPage = () => {
    setCommentPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextCommentPage = () => {
    const answer = data.answers.find((ans) => ans.aid === currentCommentsPage);
    const commentPages = Math.ceil(answer?.cIds.length / commentsPerPage);
    setCommentPageIndex((prevIndex) => Math.min(prevIndex + 1, commentPages - 1));
  };
  
  
  
  function renderLinksInText(text) {
  // Regular expression to match [word](hyperlink) pattern
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

  // Replace the pattern with HTML anchor elements
  const result = text.replace(linkPattern, (match, word, link) => {
    return `<a href="${link}">${word}</a>`;
  });

  // Wrap the entire result in a paragraph tag
  return `<p>${result}</p>`;
}
  


  const indexOfFirstAnswer = (currentPage - 1) * itemsPerPage;
  const indexOfLastAnswer = indexOfFirstAnswer + itemsPerPage
  console.log('oldData');
  console.log(data);

  //let nData = data.answers.sort((a,b) => a.ansDate - b.ansDate);

  let currentAnswers =  question.ansIds
  .map((answerId) => data.answers.find((ans) => ans.aid === answerId))
  .sort((a,b) => new Date(b.ansDate) - new Date(a.ansDate))
  .filter((ans) => ans !== undefined) // Filter out undefined values (optional)
  .slice(indexOfFirstAnswer, indexOfLastAnswer);

  const nQuestion = data.questions.find((qObj)=> qObj.qid === question.qid);
  //question = nQuestion;
  console.log('answers are');
  console.log(nQuestion);
  console.log(question);
  // Assuming that question.ansIds is an array of answer IDs
  //let updateQues = data.questions.find((qobj)=> qobj.qid === question.qid);
   
  const pinnedAidSearch = data.answers.find((ansObj) => ansObj.aid === question.pinnedAid);
  console.log('recent data');
      console.log(data);
      console.log(question.pinnedAid);
      console.log(question.askedBy);
      console.log(username);
      console.log(pinnedAidSearch);
      if(pinnedAidSearch){
      //setPinnedAid(pinnedAidSearch.aid);
  
  } 
  //console.log(sortAnswers);
  
    
  



  
  const handleCommentSubmit = async (answerId) => {
    const validationMessage = validateInputAndGetMessage(commentText, props.username);

    if (validationMessage) {
      setCommentErrorMessage("Comment Validation Message:"+validationMessage);
      return;
    }

    // Assuming you have an API endpoint for adding comments
    await axios.post('http://localhost:8000/newcomment', {
      ansId: answerId, // Use the provided answerId
      text: commentText,
      username: props.username,
      qid:question.qid, // Use the prop value for the username
    })
      .then((response) => {
        console.log('Comment post Response:', response);
        if (response.data) {
        
          //ADD RESPONSE STATUS WITH REPTOOLOW HERE TOO, do not post the comment if rep is < 50
          const newComment = response.data.comment;
          newComment['cid'] = newComment._id;
          const updatedData = { ...data };
          
          
          updatedData.comments.push(newComment);

          

          // Find the current answer
          const currentAnswer = updatedData.answers.find((ans) => ans.aid === answerId);

          // Update the answer with the new comment ID
          if (currentAnswer) {
            currentAnswer.cIds.push(newComment._id);
          }

          // Set the updated data to the state
          console.log('updatedData: ');
          console.log(updatedData);
          
          setData(updatedData);

          // Reset the comment form
          setCommentText('');
          setCommentErrorMessage('');
        }
      })
      .catch((error) => {
      console.log(error);
        setCommentErrorMessage(error.response.data.message);
        
        
      });
  };
  
  function formatQuestionTimestamp(timestamp, currentTime) {
 
  
  const datePosted = new Date(timestamp);
  const currentDate = new Date(currentTime);
  const timeDifference = (currentDate - datePosted) / 1000; // Convert to seconds

  if (timeDifference < 60) {
    return `${Math.floor(timeDifference)} seconds ago`;
  } else if (timeDifference < 3600) {
    const minutesAgo = Math.floor(timeDifference / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (timeDifference < 86400) {
    const hoursAgo = Math.floor(timeDifference / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (currentDate.toDateString() === datePosted.toDateString()) {
    // Same day, display time
    const hh = datePosted.getHours().toString().padStart(2, '0');
    const min = datePosted.getMinutes().toString().padStart(2, '0');
    return `Today at ${hh}:${min}`;
  } else if (currentDate.getFullYear() === datePosted.getFullYear()) {
    // Same year, display month and day
    const month = datePosted.toLocaleString('default', { month: 'short' });
    const day = datePosted.getDate().toString().padStart(2, '0'); // Add leading zero
    const hh = datePosted.getHours().toString().padStart(2, '0');
    const min = datePosted.getMinutes().toString().padStart(2, '0');
    return `Asked ${month} ${day} at ${hh}:${min}`;
  } else {
    // Different year, display year, month, and day
    const month = datePosted.toLocaleString('default', { month: 'short' });
    const day = datePosted.getDate().toString().padStart(2, '0'); // Add leading zero
    const year = datePosted.getFullYear();
    const hh = datePosted.getHours().toString().padStart(2, '0');
    const min = datePosted.getMinutes().toString().padStart(2, '0');
    return ` ${month} ${day}, ${year} at ${hh}:${min}`;
  }
}
  // Function to handle submitting a new answer
  const handleAnswerSubmit = async () => {
      
      let qid = question.qid;
      
      await axios.post('http://localhost:8000/newanswer',{
      qid,
      ansBy:username,
      text,
      votes:0 
    }
    
    )
    
    .then(response => {
    console.log('Answer post Response:', response);
    
    if (response.data) {
      const newAnswer = response.data;
      console.log("this is the new answer");
      console.log(newAnswer);
      console.log("this is data");
      console.log(data);
      
      // Update the state with the new answer
      
      

       
      question.ansIds.unshift(newAnswer._id);
      
      newAnswer['aid'] = newAnswer._id;
      
      setData(data.answers.unshift(newAnswer));
      
     
      console.log("new data");
      
      console.log(data);
    }}
  )
    .catch(error =>{
      console.log(error);
    })
    setData(data);
     const validationMessage = validateInputAndGetMessage(text, username);

    if (validationMessage) {
      setErrorMessage(validationMessage); // Set the error message
      return;
    }
    // Create a new answer object
    //const newAnswer = {
      //aid: Date.now(), // Replace with a proper ID generation method
      //text: newAnswerText,
      //ansBy: newAnswerUser, // Use the entered username
      //ansDate: Date.now(), // Replace with the current date and time
    //};

    // Add the new answer to the question's answers list
    //question.ansIds.unshift(newAnswer.aid);
    //data.answers.unshift(newAnswer);0

    // Reset the answer form and hide it
    setText('');
   
    setErrorMessage(''); // Clear any previous error message
   
    console.log("updating state");
    
    setShowAnswerForm(false);

    //setClickedQuestion(true);
   
  };
  
    const showAddAnswerButton = username !== 'guest';
    
   //question = data.questions.find((questionO) => questionO.qid === question.qid);
   console.log(question);
   return (
  <div>
    {showAnswerForm ? (
      <div>
        
        <textarea
          placeholder="Your answer..."
          value={text}
          id="answerTextInput"
          onChange={(e) => setText(e.target.value)}
        />
        {showAddAnswerButton && (
            <button onClick={handleAnswerSubmit}>
              Post Answer
            </button>
          )}

        <button onClick={() => setShowAnswerForm(false)}>Cancel</button>
      </div>
    ) : (
      <div>
        <div id="answersHeader">
          <div className="wd-grid-question-row"></div>
          <div className="wd-flex-question-row-container">
            <div className="postStats">
            <div> Pinned Answer: {question.pinnedAid} </div>
              <span id="postTitle" className="stats-format">
                {question.ansIds.length} answers
              </span>
              <span className="stats-format">{question.views+1} views</span>
              <span className="stats-format">{question.votes} votes</span>

            </div>
            <div className="q-post">
              {showAddAnswerButton && (<div className="add-question-btn"> Ask a Question </div>)}
              <div id="postTitle" className="postTitle">
                {question.title}
              </div>
              <div
                id="questionText"
                className="questionText"
                dangerouslySetInnerHTML={{ __html: renderLinksInText(question.text) }}
              ></div>
            </div>
             <div>
                    <button id={`upvoteButtonQuestion-${question.qid}`}  onClick={(event) => handleUpvote(question.qid, event,"question")}>
                      Upvote
                    </button>
                    <button id={`downvoteButtonQuestion-${question.qid}`}  onClick={(event) => handleDownvote(question.qid, event,"question")}>
                      Downvote
                    </button>
                  </div>
            <div id=".lastActivity" className="lastActivity">
              <div className="askedBy">asked by: {question.askedBy}</div>
              <div className="askdate">
                &nbsp;{formatQuestionTimestamp(question.askDate, new Date())}&nbsp;
              </div>
            </div>
          </div>
        </div>
        <div id="answers">
          {currentAnswers.map((answer) => {
            let isPin = 0;
            if (answer.aid === question.pinnedAid)
            {
             isPin = 1;
             
            }
            console.log(question.pinnedAid);
            console.log(answer.aid);
            const answerComments = answer.cIds
  .map((commentId) => renderComment(commentId));
            answerComments.reverse();
            return (
              <div key={answer.aid} className="answer">
                <div
                  id= {`answerText-${answer.aid}`}
                  className="answerText"
                  dangerouslySetInnerHTML={{ __html: renderLinksInText(answer.text) }}
                ></div>
                
                {isPin  === 1 &&  (<div> Pinned Answer </div>)}
                
                <button id={`upvoteButtonAnswer-${answer.aid}`} onClick={(event) => handleUpvote(answer.aid, event, "answer")}>Upvote</button>
		<button id={`downvoteButtonAnswer-${answer.aid}`} onClick={(event) => handleDownvote(answer.aid, event, "answer")}>Downvote</button>
		{username === question.askedBy && (<button id='pinAnswer' onClick={(event) => makePinnedAnswer(answer.aid,event)}>Make Pinned</button>)}
                <div id="lastActivity" className="lastActivity">
                  <div className="answerAuthor">
                    Answered by: {answer.ansBy}, Timestamp:{' '}
                    <div id="answerVotes">  {answer.votes} Votes </div>
                    {formatQuestionTimestamp(answer.ansDate, new Date())}
                  </div>
                  <button onClick={() => handleViewComments(answer.aid)}>View Comments</button>
                </div>
                {currentCommentsPage === answer.aid  && (
                  <div>
                    {answerComments
                      .slice(commentPageIndex * commentsPerPage, (commentPageIndex + 1) * commentsPerPage)
                      .map((comment) => comment)}
                    <div className="pagination-buttons">
                      <button id = "commentPagePrev" onClick={handlePrevCommentPage} disabled={commentPageIndex === 0}>
                        Comments-Prev
                      </button>
                      <span>{`Page ${commentPageIndex + 1}`}</span>
                      <button
			id = "commentPageNext"
                        onClick={handleNextCommentPage}
                        disabled={(commentPageIndex + 1) * commentsPerPage >= answerComments.length}
                      >
                        Comments-Next
                      </button>
                      <textarea id = "commentBox"
              placeholder="Your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            {showAddAnswerButton && (<button onClick={() => handleCommentSubmit(answer.aid)}> Post Comment</button>)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="pagination-buttons">
          <button
            onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={currentPage === 1}
            id = "answerPagePrev"
          >
            Answers-Prev
          </button>
          <span>{`Page ${currentPage}`}</span>
          <button
            id ="answerPageNext"
            onClick={() =>
              setCurrentPage((prevPage) =>
                Math.min(prevPage + 1, Math.ceil(question.ansIds.length / itemsPerPage))
              )
            }
            disabled={indexOfLastAnswer >= question.ansIds.length}
          >
            Answers-Next 
          </button>
        </div>
        {showAddAnswerButton && (<button onClick={() => setShowAnswerForm(true)}>Answer Question</button>)}
      </div>
    )}
   {commentErrorMessage && <div className="comment-error-message">{commentErrorMessage}</div>}
   {errorMessage && <div className="error-message">{errorMessage}</div>}
  </div>
);

}

export default Answer;

