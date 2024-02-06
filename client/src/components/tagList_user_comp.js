import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

function UserTagList({user}) {
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

  const handleEditTag = () => {
    console.log("edit tag clicked");
  }

  const handleDeleteTag = () => {
    console.log("delete tag clicked");
  }

  return (
    <div>
      {showTaglist ? (
        <div className="tags-container">
          <div className="welcome-header"> All Tags {user} tags </div>
          <div className="page-results-title">{data.tags.length} Tags</div>
    
          {data.tags.map((tag) => (
            <div key={tag.tid}>
              <TagNode tagName={tag.name} count={tag.count} />
              <button id="deleteTag" onClick={() => handleDeleteTag(tag.tid)}>Delete Tag</button>
              <button id="editTag" onClick={() => handleEditTag(tag.tid)}>Edit Tag</button>
            </div>
          ))}
        </div>
      ) : (
        null
      )}
    </div>
  );
}
export default UserTagList;

