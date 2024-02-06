import React from 'react';
import '../stylesheets/index.css';
import axios from 'axios'; // Import Axios

export default class UserQuestion extends React.Component {
  constructor(props) {
    super(props);
    console.log("PROPS INSIDE USER QUESTION", props.userIdentification);
    this.state = {
      data: {
        questions: [],
        tags: [],
        answers: [],
        userName: props.userIdentification,
      },
      currentPage: 1,
      itemsPerPage: 5,
    };
  }

  componentDidMount() {
    console.log("CHECKING THIS STATE", this.state.data.userName);
    const userStringId = this.state.data.userName;
    
    console.log("String INPUT", userStringId);

    axios
      .get(`http://localhost:8000/userprofile/questions/${userStringId}`)
      .then((response) => {
        const sortedQuestions = response.data.questions.sort((a, b) => {
          return new Date(b.askDate) - new Date(a.askDate);
        });

        this.setState({
          data: {
            questions: sortedQuestions,
            tags: response.data.tags || [],
            answers: response.data.answers || [],
          },
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  handleQuestionClick = (qid) => {
    this.props.onQuestionClick(qid);
  };

  formatQuestionTimestamp(timestamp, currentTime) {
    const datePosted = new Date(timestamp);
    const currentDate = new Date(currentTime);
    const timeDifference = (currentDate - datePosted) / 1000;

    if (timeDifference < 60) {
      return `${Math.floor(timeDifference)} seconds ago`;
    } else if (timeDifference < 3600) {
      const minutesAgo = Math.floor(timeDifference / 60);
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (timeDifference < 86400) {
      const hoursAgo = Math.floor(timeDifference / 3600);
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else if (currentDate.toDateString() === datePosted.toDateString()) {
      const hh = datePosted.getHours().toString().padStart(2, '0');
      const min = datePosted.getMinutes().toString().padStart(2, '0');
      return `Today at ${hh}:${min}`;
    } else if (currentDate.getFullYear() === datePosted.getFullYear()) {
      const month = datePosted.toLocaleString('default', { month: 'short' });
      const day = datePosted.getDate().toString().padStart(2, '0');
      const hh = datePosted.getHours().toString().padStart(2, '0');
      const min = datePosted.getMinutes().toString().padStart(2, '0');
      return `Asked ${month} ${day} at ${hh}:${min}`;
    } else {
      const month = datePosted.toLocaleString('default', { month: 'short' });
      const day = datePosted.getDate().toString().padStart(2, '0');
      const year = datePosted.getFullYear();
      const hh = datePosted.getHours().toString().padStart(2, '0');
      const min = datePosted.getMinutes().toString().padStart(2, '0');
      return ` ${month} ${day}, ${year} at ${hh}:${min}`;
    }
  }
  handleNextPage = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handlePrevPage = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage - 1,
    }));
  };
  render() {
    const { filterText, shownewestsortText, showactiveSortText, showunansweredSortText } = this.props;
    console.log("search box", filterText);
    const { questions, tags, answers } = this.state.data;

    let sortedQuestions = [...questions];
    const questionMostRecentAnswers = [];
    const tagList = [];

    questions.forEach((question) => {
      question.tagIds.forEach((tagId) => {
        const tag = tags.find((tag) => tag.tid === tagId);
        if (tag) {
          tagList.push(
            <li key={tag.tid} className="postTag">
              {tag.name}
            </li>
          );
        }
      });
    });

    //const searchStringLower = filterText.toLowerCase();

    //const tagNames = searchStringLower.match(/\[(.*?)]\]/g) || [];
    //const nonTagWords = searchStringLower.replace(/\[.*?]/g, ' ').split(' ').filter((word) => word.trim() !== '');

    

        // SORTING LOGIC
        sortedQuestions.sort((a, b) => b.askDate - a.askDate); // Sorted by newest by default

        if (shownewestsortText) {
          // console.log("in question comp1 newest sort");
          sortedQuestions.sort((a, b) => b.askDate - a.askDate);
        } 
        if (showactiveSortText) {
          console.log("in question comp1 active sort");
          sortedQuestions.forEach((question) => {
            let mostRecentAnswer = null;
            question.ansIds.forEach((ansId) => {
              const answer = answers.find((ans) => ans.aid === ansId);
              console.log("the info", answer)
              if (answer && (!mostRecentAnswer || answer.ansDate < mostRecentAnswer.ansDate)) {
                mostRecentAnswer = answer;
              }
            });if (mostRecentAnswer) {
              questionMostRecentAnswers.unshift({ question, answer: mostRecentAnswer });
            }
          });
          console.log("before", questionMostRecentAnswers);
          questionMostRecentAnswers.sort((a, b) => {
            // console.log("date string", a.answer.ansDate);
            // console.log("date type", typeof a.answer.ansDate)
            const dateA = new Date(a.answer.ansDate);
            const dateB = new Date(b.answer.ansDate);
            return dateB - dateA;
          });
          console.log("after sort", questionMostRecentAnswers);
          sortedQuestions = questionMostRecentAnswers.map((pair) => pair.question);
          console.log("final sort", sortedQuestions)
          
        } 
        if (showunansweredSortText) {
          // console.log("in question comp1 unansweredSortText");
          sortedQuestions = sortedQuestions
            .filter((question) => question.ansIds.length === 0)
            .sort((a, b) => b.askDate - a.askDate);
        }
    

    const indexOfFirstQuestion = (this.state.currentPage - 1) * this.state.itemsPerPage;
    const indexOfLastQuestion = indexOfFirstQuestion + this.state.itemsPerPage;
    let currentQuestions = sortedQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    // const tagNames = filterText.match(/\[(.*?)\]/g);
    // const nonTagWords = filterText.replace(/\[.*?]/g, ' ').split(' ').filter(word => word.trim() !== '');
    // console.log(tagNames);
    // console.log("tagNames", tagNames);
    // console.log("non", nonTagWords);
    // console.log("filter text",filterText)

    if (filterText) {
      const lowercaseFilterText = filterText.toLowerCase();
      currentQuestions = currentQuestions.filter((question) => {
      const lowercaseTitle = question.title.toLowerCase();
      const lowercaseText = question.text.toLowerCase();
      return lowercaseTitle.includes(lowercaseFilterText)|| lowercaseText.includes(lowercaseFilterText);
    });
    console.log("search functionality", currentQuestions);
  }
  // console.log(tagNames);
  // const tagObjectsFound = [];
  
  // if (tagNames) {
  //   const extractedTagStrings = tagNames.map(match => match.replace(/\[|\]/g, ''));
  //   console.log(extractedTagStrings);
  //   sortedQuestions = sortedQuestions.filter(question => {
  //     question.tagIds.forEach(tagId => {
  //       const qtag = tags.find(t => t.tid === tagId);
  //       if (qtag) {
  //         tagObjectsFound.push(qtag.name);
  //       }
  //     });
  //     const matchFound = extractedTagStrings.some(elem => tagObjectsFound.includes(elem));
  //     const lowercasenonTagWordsTitle = question.title.toLowerCase();
  //     const lowercasenonTagWordsText = question.text.toLowerCase();
  //     const lowercaseFilterText = filterText.toLowerCase();
  //     const nonTagWordsString = nonTagWords.join(' ');
  
  //     return (
  //       lowercasenonTagWordsTitle.includes(nonTagWordsString) ||
  //       lowercasenonTagWordsText.includes(nonTagWordsString) ||
  //       lowercasenonTagWordsTitle.includes(lowercaseFilterText)|| 
  //       lowercasenonTagWordsText.includes(lowercaseFilterText)||
  //       matchFound 
  //     );
  //   });
  // }


  
    
    return (
      <div>
        {filterText ? (
          <ul>
            {currentQuestions.map((question, qid) => (
              <li key={qid} onClick={() => this.handleQuestionClick(question.qid)}>
                <div className="wd-grid-question-row"></div>
                <div className="wd-flex-question-row-container">
                  <div className="postStats">
                    <span id="postTitle" className="stats-format">
                      {question.ansIds.length} answers
                    </span>
                    <span className="stats-format">{question.views} views</span>
                  </div>
                  <div className="q-post">
                    <div className="postTitle" id="postTitle">
                    {question.title}
                    </div>
                    <div id="postSummary" className="postSummary">
                    {question.text.substring(0, Math.floor(question.text.length / 2))}
                    </div>
                  </div>
                  <div id=".lastActivity" className="lastActivity">
                    <div  id ="askedBy" className="askdate">
                      {question.askedBy} asked {this.formatQuestionTimestamp(question.askDate, new Date())}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {currentQuestions.map((question, index) => (
              <li key={index} onClick={() => this.handleQuestionClick(question.qid)}>
                <div className="wd-grid-question-row"></div>
                <div className="wd-flex-question-row-container">
                  <div className="postStats">
                    <span className="stats-format">{question.ansIds.length} answers</span>
                    <span className="stats-format">{question.views} views</span>
                  </div>
                  <div className="q-post">
                    <div className="postTitle">
                      {question.title}
                      </div>
                      <div id="postSummary" className="postSummary">
                      {question.text.substring(0, Math.floor(question.text.length / 2))}
                    </div>
                    <div>
                      <ul>{tagList.filter((tag) => question.tagIds.includes(tag.key))}</ul>
                    </div>
                  </div>
                  <div id=".lastActivity" className="lastActivity">
                    <span  id="askedBy" className="username">
                      {question.askedBy} asked {this.formatQuestionTimestamp(question.askDate, new Date())}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
       <div className="pagination-buttons">
          <button onClick={this.handlePrevPage} disabled={this.state.currentPage === 1} id ="prevButton"> 
            Prev
          </button>
          <span>{`Page ${this.state.currentPage}`}</span>
          <button onClick={this.handleNextPage} disabled={indexOfLastQuestion >= sortedQuestions.length} id = "nextButton">
            Nexts
          </button>
        </div>
      </div> 
    
    );
  }
}
