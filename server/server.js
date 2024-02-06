// Application server
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); // Import the uuid library

const session = require("express-session")

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


const port = 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const mongoDB = "mongodb://127.0.0.1:27017/fake_so_new";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function () {
  console.log('Connected to database');
});


app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    secret: `SECRET_KEY`,
    cookie: {
        httpOnly: true,
        sameSite: true,
    },
    resave: false,
    saveUninitialized: false
  })
)
const {questionSchema} = require('./models/questionSchema.js')
const {answerSchema} = require('./models/answerSchema.js')
const {tagSchema} = require('./models/tagSchema.js')
const {userSchema} = require('./models/userSchema.js')
const {commentSchema} = require('./models/commentSchema.js')

//Mongoose models that all you to modify collections in the databse
const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);
const Tag = mongoose.model('Tag', tagSchema);
const User = mongoose.model('User', userSchema);
const Comment = mongoose.model('Comment', commentSchema);

// const questionSchema = new mongoose.Schema({
//   title: String,
//   text: String,
//   tagIds: [String],
//   askedBy: String,
//   askDate: Date,
//   ansIds: [String],
//   views: Number,
// });

// const answerSchema = new mongoose.Schema({
//   text: String,
//   ansBy: String,
//   ansDate: Date,
// });

// const tagSchema = new mongoose.Schema({
//   name: String,
  
// });

// const Question = mongoose.model('Question', questionSchema);
// // const Answer = mongoose.model('Answer', answerSchema);
// const Tag = mongoose.model('Tag', tagSchema);

app.get('/getData', async (req, res) => {
  try {
    const questions = await Question.find();
    // console.log("questions passed");
    const tags = await Tag.find();
    // console.log("tags passed");
    const answers = await Answer.find();
    const comments = await Comment.find(); 
    // console.log("comment passed", comments);
    
    const data = {
      questions: questions.map(question => ({
        qid: question._id.toString(),
        title: question.title,
        summTitle: question.summTitle,
        pinnedAid: question.pinnedAid,
        
        text: question.text,
        votes: question.votes,
        tagIds: question.tagIds.map(tagId => tagId.toString()),
        askedBy: question.askedBy,
        askDate: question.askDate,
        ansIds: question.ansIds.map(ansId => ansId.toString()),
        lastUpdated: question.lastUpdated,
        views: typeof question.views === 'number' ? question.views : 0
      })), 
      tags: tags.map(tag => ({
        tid: tag._id.toString(),
        name: tag.name,
      })),
      answers: answers.map(answer => ({
        aid: answer._id.toString(),
        text: answer.text,
        votes:answer.votes,
        ansBy: answer.ansBy,
        cIds: answer.cIds.map(cId => cId.toString()),
        ansDate: answer.ansDate,
      })),
      comments: comments.map(comment => ({
      	cid:comment._id.toString(),
       text:comment.text,
       commentedBy:comment.commentedBy,
       commentDate:comment.commentDate,
       commentVotes:comment.commentVotes,
      })),
	
    };

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/newanswer', async (req, res) => {
  try {
    const { ansBy, text ,votes} = req.body;
    const ansDate = new Date();

    const newAnswer = new Answer({
      ansBy,
      text,
      ansDate,
      votes:0,
    });

    let savedAnswer = await newAnswer.save();
    savedAnswer.ansId = savedAnswer._id;
    
    const questionIdToUpdate = req.body.qid;
    console.log("new question");
    console.log(questionIdToUpdate);
    
    console.log(questionIdToUpdate);
    const qtimeUpdate = await Question.findById(questionIdToUpdate);

    qtimeUpdate.lastUpdated = new Date();
    const qUpdate = await qtimeUpdate.save();
    console.log(qUpdate);
    await Question.findByIdAndUpdate(
      questionIdToUpdate,
      { $push: { ansIds: savedAnswer._id } },
      { new: true }
    );

    console.log('Answer saved:', savedAnswer);
    res.status(201).json(savedAnswer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.post('/newquestion', async (req, res) => {
//   try {
//     const { title, text, askedBy, tags } = req.body;
//     const askDate = new Date();

//     console.log("All information received from form", req.body);

//     // Check if question exists
//     const existingQuestion = await Question.findOne({ title });

//     if (existingQuestion) {
     
//       existingQuestion.askDate = askDate;
//       existingQuestion.views = 0;


//       const updatedQuestion = await existingQuestion.save();

//       console.log('Question updated:', updatedQuestion);
//       res.status(200).json({ status: 'success', message: 'Question updated', question: updatedQuestion });
//     } else {
     
//       const newQuestion = new Question({
//         title,
//         text,
//         askedBy,
//         askDate,
//         ansIds: [],
//         views: 0,
//         tagIds: [],
//       });

//       const savedQuestion = await newQuestion.save();
//       console.log('New question saved:', savedQuestion);
//       res.status(201).json({ status: 'success', message: 'New question saved', question: savedQuestion });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: 'error', message: 'Internal Server Error' });
//   }
// });

//Async functions let us write promise-based code

let CreateQuestion = require('./pages/create_question');

app.post('/newquestion', async (req, res) => {
  try {
    const { title, text, askedBy, tags } = req.body;
    const askDate = new Date();

    const user = await User.findOne({ username: askedBy });

    const userRep = user.rep;
     
    /*
    const existingUser = await User.findOne({askedBy});
    if(existingUser.rep < 50)
    {
    			res.status(200).json({ status: 'repTooLow', message: 'Question updated', question: updatedQuestion });
    }
    */  
    
    console.log("All information received from form", req.body);

    const existingQuestion = await Question.findOne({ title }); //Receiving the results from a promise 
    console.log("after Existing question")
    if (existingQuestion) {
      // Update existing question's timestamp and reset views if it already exists
      existingQuestion.askDate = askDate;
      existingQuestion.views = 0;

      const updatedQuestion = await existingQuestion.save();
      console.log('Question updated:', updatedQuestion);

      res.status(200).json({ status: 'success', message: 'Question updated', question: updatedQuestion });
    } if (userRep < 50){
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    } else {
      if (title && text && askedBy && tags) {
        nQuestion = await CreateQuestion.new_question(res,  title, text, askedBy,tags);
        res.status(200).json({ status: 'success', message: 'Question updated', question: nQuestion}
        ) } 
        }
      } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }}
);


// let CreateQuestion = require('./pages/create_question');

// app.post('/newquestion', async (req, res) => {
//   try {
//     const { title, text, askedBy, tags } = req.body;
//     const askDate = new Date();
//     console.log("All information received from form", req.body);

//     if (title) {
//       console.log("Enter Create Question");
//       const savedQues = await CreateQuestion.new_question(title, text, askedBy, tags);
//       console.log("Question Created");
//       res.status(201).json({ status: 'success', message: 'New question saved', question: savedQues });
//     } else {
//       res.status(400).json({ status: 'error', message: 'Title is required' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
//   }
// });


// app.post('/newquestion', async (req, res) => {
//   try {
//     const { title, text, askedBy, tags } = req.body;
//     const askDate = new Date();
    
//     console.log("All information received from form", req.body);
//     // const existingQuestion = await Question.findOne({ title }); //Receiving the results from a promise 
//     console.log("after Existing question")
//     if (title) {
//         console.log("enter Create Question")
//         CreateQuestion.new_question(res,title, text, askedBy,tags).catch(err => {
//                 return res.send('Failed to create new question ' + err);}
//         )} 
//         console.log("Question Created")
//       } catch (error) {
//     console.error(error);
//     return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
//   }}
// );





app.post('/newcomment', async (req, res) => {
  try {
    const { ansId, text, username,qid } = req.body;
    const cUser = await User.findOne({ username });
	
    if (text.length > 140 || cUser.rep < 50) {
      if (text.length > 140) {
        return res.status(500).json({ message: 'Comment Too Long' });
      } else {
        return res.status(500).json({ message: 'Rep Too Low' });
      }
    }

    const newComment = new Comment({
      commentedBy: username,
      text: text,
      commentDate: new Date(),
      commentVotes: 0,
    });

    let savedComment = await newComment.save();
    savedComment.cid = savedComment._id;

    await Answer.findByIdAndUpdate(
      ansId,
      { $push: { cIds: savedComment._id } },
      { new: true }
    );
    
    
    console.log(qid);
    const updateQues = await Question.findById(qid);
    updateQues.lastUpdated = new Date();
    const newUpdateQues = await updateQues.save(); 
    console.log('Comment saved:', newComment);
    return res.status(201).json({
      status: 'success',
      message: 'Comment Saved',
      comment: newComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});










const saltRounds = 10; // You can adjust this value based on your security requirements




//email check presence, username check presence, password check, password cannot contain part of email or password

function validatePassword(password,username,email,cPassword){
	  
          if ( password.includes({email}) || password.includes({username}) || password != cPassword )   { 
                console.log('failed password validation');
                return false
          }
          return true
          
}







app.post('/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    console.log(password);
    
    // Check if the username already exists
    
    const existingUser = await User.findOne({ username }) || await User.findOne({ email });
    let validationString = '';
    
    
    
    if (existingUser) {
      validationString = validationString + ' Username or email exists';
      
      if (!validatePassword(password,username,email)) {
            validationString += 'Password is invalid';
            return res.status(400).json({ status: 'errorPassUser', message: validationString });
        }
        console.log(validationString);
      return res.status(400).json({ status: 'errorUser', message: validationString });
    }
    else{
        if (!validatePassword(password,username,email,confirmPassword)) {
            validationString = validationString +  'Password is invalid';
            return res.status(400).json({ status: 'errorPass', message: validationString });
        }
                console.log(validationString);
      
    }
    
    
    // Generate salt and hash the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user
    const newUser = new User({
      username:username,
      password:hashedPassword,
      email:email,
      memberJoinDate: new Date(),
      rep: 0,
      
    });
    console.log(newUser);
    // Save the user in the database
    const savedUser = await newUser.save();
    
    // Store user information in the session
    req.session.user = {
      userId: savedUser._id.toString(),
      username: savedUser.username,
      email: savedUser.email,
    };

    console.log('User registered:', savedUser);

    // Return the user information to the client
    res.status(201).json({
      status: 'success',
      message: 'User registered',
      user: {
        userId: savedUser._id.toString(),
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

app.post('/authenticate', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the username exists in the database
    const user = await User.findOne({ email });
    console.log("USER FOUND", user);

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Unregistered Username' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ status: 'error', message: 'Incorrect Password' });
    }

    // Store user information in the session
    req.session.user = {
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
    };

    // Authentication successful
    res.status(200).json({
      status: 'success',
      message: 'Authentication successful',
      sessionObj: {
        userId: user._id.toString(),
        username: user.username,
        email: user.email,
        sessionId: req.sessionID,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

app.post('/vote', async (req, res) => {
  try {
    const { id, type, username, source } = req.body;
    console.log(id, type, username,source);
    console.log(id);
    console.log(type);

    const user = await User.findOne({ username });
    
    if (user.rep < 50) {
      res.status(200).json({ status: "reptoolow" });
      return; // Return here to prevent further execution
    }

    if (source === "question") {
      const recQuestion = await Question.findById(id);
      
      recQuestion.lastUpdated = new Date();
      
      const savedQ = await recQuestion.save();
      console.log("updated quesiton time");
      console.log(savedQ);
      if (type === "positive") {
        await Promise.all([
          Question.findByIdAndUpdate(
            id,
            { $inc: { votes: 1 } },
            { new: true }
          ),
          User.updateOne(
            { username: username },
            { $inc: { rep: 5 } }
          ),
        ]);
      } else {
        await Promise.all([
          Question.findByIdAndUpdate(
            id,
            { $inc: { votes: -1 } },
            { new: true }
          ),
          User.updateOne(
            { username: username },
            { $inc: { rep: -10 } }
          ),
        ]);
      }

      res.status(200).json({ status: "vote made" });
      return; // Return here to prevent further execution
    } else if (source === "answer") {
      //const recAnswer = await Answer.findById(id);

       // Assuming answer ID is stored in the _id field

  // Find the question that contains the answer ID in its ansIds array
      const recQuestion = await Question.findOne({ ansIds: id });

      if (recQuestion) {
      recQuestion.lastUpdated = new Date();
    
      const savedQuestion = await recQuestion.save();
      }
      if (type === "positive") {
        await Promise.all([
          Answer.findByIdAndUpdate(
            id,
            { $inc: { votes: 1 } },
            { new: true }
          ),
          User.updateOne(
            { username: username },
            { $inc: { rep: 5 } }
          ),
        ]);
      } else {
        await Promise.all([
          Answer.findByIdAndUpdate(
            id,
            { $inc: { votes: -1 } },
            { new: true }
          ),
          User.updateOne(
            { username: username },
            { $inc: { rep: -10 } }
          ),
        ]);
      }

      res.status(200).json({ status: "vote made" });
      return; // Return here to prevent further execution
    } else {
      const recAnswer  = await Answer.findOne({cIds: id});
      
      const recQuestion = await Question.findOne({ ansIds: recAnswer._id });

      if (recQuestion) {
      recQuestion.lastUpdated = new Date();
    
      const savedQuestion = await recQuestion.save();
      }
      if (type === "positive") {
        await Promise.all([
          Comment.findByIdAndUpdate(
            id,
            { $inc: { commentVotes: 1 } },
            { new: true }
          ),
        ]);
      }
    }
    console.log("cOMMENT UPDATED:");
    const editcom =await Comment.find();
    console.log(editcom);
    res.status(200).json({ status: "vote made" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});


app.post('/updatePinned', async (req, res) => {
  try {
    const { qid, aid } = req.body;
    console.log(qid,aid);
    // Find the question by qid
    const questionWithPin = await Question.findById(qid );
    console.log(questionWithPin);
    if (!questionWithPin) {
      return res.status(404).json({ status: 'error', message: 'Question not found' });
    }

    // Attach the answer id to the pinnedAnswer field of the question
    questionWithPin.pinnedAid = aid;

    // Save the updated question
    const nQ = await questionWithPin.save();
    console.log(nQ);
    
    res.status(200).json({ status: 'success', message: 'Answer pinned successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', message: 'Pinning answer failed' });
  }
});


app.get('/userprofile/metrics/:userName', async (req, res) => { 
  try {
    const userName = req.params.userName;
    const users = await User.find();
    const user = await User.findOne({username: userName}); //NEED TO CHANGE: no-hardcoding
    if (user) {
      res.status(200).json({
         username: user.username,
         email: user.email,
         rep: user.rep,
         memberJoinDate: user.memberJoinDate,
     })
    } else {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/userprofile/questions/:userName', async (req, res) => { 
  try {
    const userName = req.params.userName;
   
    const users = await User.find();
    const user = await User.findOne({userName: userName});
    const questions = await Question.find();
    const filteredUsernameQuestions = questions.filter(question => question.askedBy === userName);
    if (users) {
      res.status(200).json({
          questions: filteredUsernameQuestions.map(question => ({
          qid: question._id.toString(), //NEED TO CHANGE: Why to string? Does not match with schema
          title: question.title,
          summTitle: question.summTitle,
          pinnedAid: question.pinnedAid,
          text: question.text,
          votes: question.votes,
          tagIds: question.tagIds.map(tagId => tagId.toString()),
          askedBy: question.askedBy,
          askDate: question.askDate,
          ansIds: question.ansIds.map(ansId => ansId.toString()),
          views: typeof question.views === 'number' ? question.views : 0
        }))
     })
    
    } else {
      console.log('User Specific Questions not found');
      return res.status(404).json({ status: 'error', message: 'User Specific Questions not found' });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/userprofile/tags/:userName', async (req, res) => { 
  try {
    const userName = req.params.userName;
    console.log("userName from UI", userName);
    const users = await User.find();
    const tags = await Tag.find();
    const user = await User.findOne({username: userName}); 
    const questions = await Question.find();
    const filteredUsernameQuestions = questions.filter(question => question.askedBy === userName);
    const findTagsForQuestion = (question) => {
      const tagObjects = question.tagIds.map(tagId => {
        return tags.find(tag => tag._id === tagId);
      });
      const filteredTags = tagObjects.filter(tag => tag !== undefined);
      return filteredTags;
    }
      filteredUsernameQuestions.forEach(question => {
        const associatedTags = findTagsForQuestion(question);
        console.log(`Tags associated with question ${question._id}:`, associatedTags);
      });


    {
      console.log('User Tags not found');
      return res.status(404).json({ status: 'error', message: 'User Tags not found' });
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/userprofile/deletetags/:userName', async (req, res) => { 
  try {
    const userName = req.params.userName;
    if (typeof req.params.userName === 'string') {
      console.log('req.params.userName is a string.');
    } else {
      console.log('req.params.userName is not a string.');
    }
    console.log("userName from UI", userName);
    const users = await User.find();
    console.log("all the users in the database", users);
    const user = await User.findOne({username: userName}); 
    const questions = await Question.find();
    const filteredUsernameQuestions = questions.filter(question => question.askedBy === userName);
    const userTags = filteredUsernameQuestions.reduce((tagsAccumulator, question) => {
      question.tagids.forEach(tagId => {
        const foundTag = Tag.find(tag => tag.id === tagId);
        if (foundTag && !tagsAccumulator.includes(foundTag)) {
          tagsAccumulator.push(foundTag);
        }
      });
      return tagsAccumulator;
    }, []);
    console.log('Questions asked by user:', filteredUsernameQuestions);
    console.log('Tags associated with user\'s questions:', userTags);
     {
      console.log('User Tags not found');
      return res.status(404).json({ status: 'error', message: 'User Tags not found' });
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/userprofile/answers/:userName', async (req, res) => {
  try {
    const userName = req.params.userName;
    const answers = await Answer.find();
    const user = await User.findOne({ username: userName });
    const filteredUserAnswers = answers.filter(answer => answer.ansBy === userName);

    if (user) {
      const data = {
        answers: filteredUserAnswers.map(answer => ({
          aid: answer._id.toString(),
          text: answer.text,
          votes: answer.votes,
          ansBy: answer.ansBy,
          cIds: answer.cIds.map(cId => cId.toString()),
          ansDate: answer.ansDate
        }))
      };

      res.status(200).json(data);
    } else {
      console.log('User Answers not found');
      return res.status(404).json({ status: 'error', message: 'User Answers not found' });
    }
    console.log("FOUND USERNAME HERE", user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/userprofile/updateAnswer/:userStringId/:updateId', async (req, res) => {
  try {
    const userName = req.params.userStringId;
    const editAid = req.params.updateId;
    const newText = req.body.text; 
    console.log("ANSWER UPDATE TEXT",newText);
    const user = await User.findOne({ username: userName });
    console.log("FILTER ANSWER USER", user);
    const answer = await Answer.findOne({ _id: editAid });
    console.log("FILTER ANSWER", answer);
    
    if (answer) {
      await Answer.updateOne({ _id: editAid }, { $set: { text: newText } });
      res.status(200).json({ status: 'success', message: 'Answer updated successfully' });
    } else {
      console.log('Answer not found');
      return res.status(404).json({ status: 'error', message: 'Answer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/userprofile/deleteAnswer/:userStringId/:deleteId', async (req, res) => {
  try {
    const userName = req.params.userStringId;
    console.log("STEP 1 GET USERNAME", userName);
    const user = await User.findOne({ username: userName });
    console.log("STEP 2 GET USER", user);
    const deleteAid = req.params.deleteId;
    console.log("STEP 3 GET DELETE AID", userName);
  
    if (deleteAid) {
      await Answer.findByIdAndDelete(deleteAid);
      res.status(200).json({ status: 'success', message: 'Answer deleted successfully' });
    } else {
      console.log('Answer not deleted ');
      return res.status(404).json({ status: 'error', message: 'Answer not deleted' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/userprofile/updateQuestion/:updateId', async (req, res) => {
  try {
    const editQid = req.params.updateId;
    console.log("edit QID", editQid);
    const newText = req.body.text; 
    console.log("QUESTION UPDATE TEXT",newText);
    const question = await Question.findOne({ _id: editQid});
    console.log("FILTER QUESTION", question);
    
    if (question) {
      await Question.updateOne({ _id: editQid }, { $set: { text: newText } });
      res.status(200).json({ status: 'success', message: 'Question updated successfully' });
    } else {
      console.log('Question not found');
      return res.status(404).json({ status: 'error', message: 'Question not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/userprofile/deleteQuestion/:deleteId', async (req, res) => {
  try {
    
    const deleteQid = req.params.deleteId;
    
    if (deleteQid) {
      await Question.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(deleteQid) });
      res.status(200).json({ status: 'success', message: 'Question deleted successfully' });
    } else {
      console.log('Question not deleted ');
      return res.status(404).json({ status: 'error', message: 'Question not deleted' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





