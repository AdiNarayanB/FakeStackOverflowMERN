import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

function TagList() {
  const [data, setData] = useState({
    questions: [],
    tags: [],
    answers: [],
  });

  const [showTaglist, setshowTaglist] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/getData');
      setData({
        questions: response.data.questions || [],
        tags: response.data.tags || [],
        answers: response.data.answers || [],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData(); // Initial data fetch
  }, [fetchData]);

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
 function calculateTagCount(tag, data) {
  const tagId = data.tags.find((t) => t.name === tag)?.tid;

  if (!tagId) {
    return 0; // Tag not found
  }

  return data.questions.reduce((count, question) => {
    if (question.tagIds.includes(tagId)) {
      return count + 1;
    }
    return count;
  }, 0);
}
  
  function TagNode({ tagName }) {
    const count = calculateTagCount(tagName, data);
    const questionString = count === 1 ? 'question' : 'questions';

    const handleClick = () => {
      const tagFilter = `[${tagName}]`;
      console.log('handle ONclick', tagFilter);
      setshowTaglist(false);
    };

    return (
      <div>
        <div className="tagNode" onClick={handleClick}>
          {`${tagName} ${count} ${questionString}`}
        </div>
      </div>
    );
  }

  return (
    <div>
      {showTaglist ? (
        <div className="tags-container">
        <div className="page-results-title">
                  <div className="add-question-btn"> Ask a Question </div>
                      {`All Tags `}
                      <div className="h3">{data.tags.length} Tags</div>
                  </div>
          {data.tags.map((tag) => (
            <TagNode key={tag.tid} tagName={tag.name} count={tag.count} />
          ))}
        </div>
      ) : (
        <ul>
          {data.questions.map((question, qid) => (
            <li key={qid}>
              <div className="wd-grid-question-row"></div>
              <div className="wd-flex-question-row-container">
                <div className="postStats">
                  <span id="postTitle" className="stats-format">
                    {question.ansIds.length} answers
                  </span>
                  <span className="stats-format">{question.views} views</span>
                </div>
                <div className="q-post">
                  <div id="postTitle" className="postTitle">
                    {question.title}
                  </div>
                </div>
                <div id=".lastActivity" className="lastActivity">
                  <div className="askdate">
                    {question.askedBy} asked{' '}
                    {formatQuestionTimestamp(question.askDate, new Date())}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TagList;

