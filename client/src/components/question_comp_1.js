import React from 'react';
import '../stylesheets/index.css';
import axios from 'axios'; // Import Axios

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        questions: [],
        tags: [],
        answers: [],
      },
      currentPage: 1,
      itemsPerPage: 5,
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8000/getData')
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

  handleUpvote = (qid,event,source) => {
      event.stopPropagation();
    // Implement the logic to handle upvote
    const { username } = this.props;
    const newData = { ...this.state.data };

    // Find the index of the question with the given qid in the data state
    
      const params = {
        id: qid,
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
          const questionIndex = newData.questions.findIndex((question) => question.qid === qid);
          
    
    // Check if the question with the given qid is found
    
      // Increment the votes of the question
      newData.questions[questionIndex].votes += 1;
      newData.questions[questionIndex].lastUpdated = new Date();
      // Update the state with the new data
      this.setState({
        data: newData,
      });}
        })
        .catch((error) => {
          // Handle error
          console.error('Error upvoting question:', error);
        });
    
  };
  
  handleDownvote = (qid,event,source) => {
      event.stopPropagation();
    // Implement the logic to handle upvote
    const { username } = this.props;
    const newData = { ...this.state.data };

    // Find the index of the question with the given qid in the data state
    
      const params = {
        id: qid,
        source:source,
        type: 'negative',
        username,
        
      };

      axios
        .post('http://localhost:8000/vote', params)
        .then((response) => {
          // Handle success, update the state or perform any additional actions
          console.log('Upvote successful:', response.data);
          if (response.data.status != "reptoolow"){
          const questionIndex = newData.questions.findIndex((question) => question.qid === qid);
          
    
    // Check if the question with the given qid is found
    
      // Increment the votes of the question
      newData.questions[questionIndex].votes -= 1;

      // Update the state with the new data
      this.setState({
        data: newData,
      });}
        })
        .catch((error) => {
          // Handle error
          console.error('Error upvoting question:', error);
        });
    
  };

 
  render() {
    const { filterText, shownewestsortText, showactiveSortText, showunansweredSortText } = this.props;
    console.log("search box", filterText);
    const { questions, tags, answers } = this.state.data;

    let sortedQuestions = [...questions];
    const questionMostRecentAnswers = [];
    const tagList = [];

    const processedTags = new Set();

questions.forEach((question) => {
  question.tagIds.forEach((tagId) => {
    const tag = tags.find((tag) => tag.tid === tagId);
    if (tag && !processedTags.has(tag.name)) {
      processedTags.add(tag.name);
      tagList.push(
        <li key={tag.tid} className="postTag">
          {tag.name}
        </li>
      );
    }
  });
});

    // Sorting Logic
    sortedQuestions.sort((a, b) => b.askDate - a.askDate); // Sorted by newest by default

    if (shownewestsortText) {
      sortedQuestions.sort((a, b) => b.askDate - a.askDate);
    } 
    if (showactiveSortText) {
      const nQ = sortedQuestions.sort((a,b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
      console.log("sorted upvote sort");
      console.log(nQ);
      
      console.log("in question comp1 active sort");
      sortedQuestions.forEach((question) => {
        let mostRecentAnswer = null;
        question.ansIds.forEach((ansId) => {
          const answer = answers.find((ans) => ans.aid === ansId);
          console.log("the info", answer)
          if (answer && (!mostRecentAnswer || answer.ansDate < mostRecentAnswer.ansDate)) {
            mostRecentAnswer = answer;
          }
        });
        if (mostRecentAnswer) {
          questionMostRecentAnswers.unshift({ question, answer: mostRecentAnswer });
        }
      });
      console.log("before", questionMostRecentAnswers);
      questionMostRecentAnswers.sort((a, b) => {
        const dateA = new Date(a.answer.ansDate);
        const dateB = new Date(b.answer.ansDate);
        return dateB - dateA;
      });
      console.log("after sort", questionMostRecentAnswers);
      sortedQuestions = questionMostRecentAnswers.map((pair) => pair.question);
      sortedQuestions = nQ;
      console.log("final sort", sortedQuestions);
      
      
    } 
    if (showunansweredSortText) {
      sortedQuestions = sortedQuestions
        .filter((question) => question.ansIds.length === 0)
        .sort((a, b) => b.askDate - a.askDate);
    }

    const indexOfFirstQuestion = (this.state.currentPage - 1) * this.state.itemsPerPage;
    const indexOfLastQuestion = indexOfFirstQuestion + this.state.itemsPerPage;
    let currentQuestions = sortedQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const shouldDisableButton = this.props.username==='guest';
    // async function QuestionSearch(filterText) {
    //   const searchTags = filterText.match(/\[(.*?)\]/g);
    //   const words = filterText.replace(/\[.*?]/g, ' ').split(' ').filter(word => word.trim() !== '');
      
    //   const questionMatches = await Promise.all(currentQuestions.map(async (question) => {
    //     const hasMatchingTag = await Promise.all(searchTags.map(async tag => {
    //       const tagName = tag.slice(1, -1).toLowerCase();
    //       return Promise.all(question.tagIds.map(async tagId => {
    //         const tag = await getTagById(tagId);
    //         return tag.name.toLowerCase() === tagName;
    //       })).then(results => results.some(result => result));
    //     })).then(results => results.some(result => result));

    //     const hasMatchingWord = words.some(word => 
    //       question.title.toLowerCase().includes(word.toLowerCase())||
    //       question.text.toLowerCase().includes(word.toLowerCase())
    //       );
    //     return hasMatchingTag || hasMatchingWord;
    //   }));

    //   return questionMatches;
    // }

    if (filterText) {
      const lowercaseFilterText = filterText.toLowerCase();
      currentQuestions = currentQuestions.filter((question) => {
      const lowercaseTitle = question.title.toLowerCase();
      const lowercaseText = question.text.toLowerCase();
      return lowercaseTitle.includes(lowercaseFilterText)|| lowercaseText.includes(lowercaseFilterText);
    });
    console.log("search functionality", currentQuestions);
  }
    
   
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
                    <span className="stats-format">{question.votes} votes</span>
                  </div>
                  <div className="q-post">
                    <div id="postTitle" className="postTitle">
                      {question.title}
                    </div>
                    <div id="postSummary" className="postSummary">
                      {question.text.substring(0, Math.min(50,Math.floor(question.text.length / 2)))}
                    </div>
                    <div>
                      
                      <ul>{tagList.filter((tag) => question.tagIds.includes(tag.key))}</ul>
                    </div>
                  </div>
                  <div id=".lastActivity" className="lastActivity">
                    <div className="askdate">
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
                    <span className="stats-format">{question.votes} votes</span>
                  </div>
                  <div className="q-post">
                    <div className="postTitle">
                      {question.title}
                    </div>
                    <div id="postSummary" className="postSummary">
                      {question.text.substring(0, Math.min(50,Math.floor(question.text.length / 2)))}
                    </div>
                    <div>
                      <ul>{tagList.filter((tag) => question.tagIds.includes(tag.key))}</ul>
                    </div>
                    <button id={`upvoteButton-${question.qid}`}  disabled ={shouldDisableButton}  onClick={(event) => this.handleUpvote(question.qid, event,"question")}>
                      Upvote
                    </button>
                    <button id={`downvoteButton-${question.qid}`}  disabled={shouldDisableButton} onClick={(event) => this.handleDownvote(question.qid, event,"question")}>
                      Downvote
                    </button>
                  </div>
                </div>
                <div id=".lastActivity" className="lastActivity">
                  <span className="username">
                    {question.askedBy} asked {this.formatQuestionTimestamp(question.askDate, new Date())}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="pagination-buttons">
          <button onClick={this.handlePrevPage} disabled={this.state.currentPage === 1} id="prevButton">
            Prev
          </button>
          <span>{`Page ${this.state.currentPage}`}</span>
          <button onClick={this.handleNextPage} disabled={indexOfLastQuestion >= sortedQuestions.length} id="nextButton">
            Nexts
          </button>
        </div>
      </div>
    );
  }
}

