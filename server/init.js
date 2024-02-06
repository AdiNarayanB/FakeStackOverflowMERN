// Run this script to test your schema
// Start the mongoDB service as a background process before running the script
// Pass URL of your mongoDB instance as first argument(e.g., mongodb://127.0.0.1:27017/fake_so_new)
let userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

let Tag = require('./models/tagSchema.js')
let Answer = require('./models/answerSchema.js')
let Question = require('./models/questionSchema.js')
let User = require('./models/userSchema.js');
let Comment = require('./models/commentSchema.js');
console.log(User);
let mongoose = require('mongoose');
let mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let tags = [];
let answers = [];
function tagCreate(name) {
  let tag = new Tag({ name: name });
  return tag.save();
}

function answerCreate(ans_by,text,votes,comments, ans_date_time) {
  answerdetail = {text:text,votes:votes, cIds:comments};
  
  if (ans_by != false) answerdetail.ansBy = ans_by;
  if (ans_date_time != false) answerdetail.ansDate = ans_date_time;
  
  let answer = new Answer(answerdetail);
  return answer.save();
}


 
  
function commentCreate(ctext, cBy, cDate, cVotes){
	commentdetail = {text:ctext, commentedBy:cBy, commentDate:cDate, commentVotes: cVotes};
	let comment = new Comment(commentdetail);
	return comment.save()

}



  
function questionCreate(title, summTitle, pinnedAid,text, votes, tags, asked_by, ask_date_time, answers, views) {
  qstndetail = {
    title: title,
    text: text,
    summTitle: summTitle,
    pinnedAid: pinnedAid, 
    votes:votes,
    
    tagIds: tags,
    askedBy: asked_by,
    lastUpdated: ask_date_time,
  }
  if (answers != false) qstndetail.ansIds = answers;
  if (ask_date_time != false) qstndetail.askDate = ask_date_time;
  if (views != false) qstndetail.views = views;

  let qstn = new Question(qstndetail);
  return qstn.save();
}


function userCreate(username, email, password, rep, joinDate) {
  userdetail = {
    username: username,
    email: email,
    password: password,
    rep: rep,
    memberJoinDate: joinDate,
  }
  
  

  let nUser = new User(userdetail);
  return nUser.save();
  
}


const populate = async () => {
  let t1 = await tagCreate('t1');
  let t2 = await tagCreate('t2');
  let t3 = await tagCreate('t3');
  let t4 = await tagCreate('t4');
  let t5 = await tagCreate('t5');
  let t6 = await tagCreate('t6');
  let t7 = await tagCreate('t7');
  let t8 = await tagCreate('t8');
  let t9 = await tagCreate('t9');
  
  
  
  let u1 = await userCreate('adithya','adi@gmail.com','$2b$10$dkvSgPTKxAtl74D3XdDHgO/sTzfYOxEJ1vd9jv7FZ8Csy/jF9q4kK',80,new Date('2018-11-12T07:30:00'));
  console.log(u1);
  let u2 = await userCreate('dev','dev@gmail.com','$2b$10$dkvSgPTKxAtl74D3XdDHgO/sTzfYOxEJ1vd9jv7FZ8Csy/jF9q4kK',80,new Date('2018-11-12T07:30:00'));
  let u3 = await userCreate('abaya','abaya@gmail.com','$2b$10$dkvSgPTKxAtl74D3XdDHgO/sTzfYOxEJ1vd9jv7FZ8Csy/jF9q4kK',80,new Date('2018-11-12T07:30:00'));
  let u4 = await userCreate('joji','joji@gmail.com','$2b$10$dkvSgPTKxAtl74D3XdDHgO/sTzfYOxEJ1vd9jv7FZ8Csy/jF9q4kK',80,new Date('2018-11-12T07:30:00'));
  let u5 = await userCreate('steve','steve@gmail.com','$2b$10$dkvSgPTKxAtl74D3XdDHgO/sTzfYOxEJ1vd9jv7FZ8Csy/jF9q4kK',80,new Date('2018-11-12T07:30:00'));
  let u6 = await userCreate('AdithyaNew','adi1997@gmail.com','$2b$10$J5XbaAIiSj3IoORwVid.N.SoaJo8A3pgsiWOpLCCBQSD8ZQRd5vHS',30,new Date('2020-11-12T07:30:00'));
  let u7 = await userCreate('adithya3','raoadi.8@gmail.com','$2b$10$dkvSgPTKxAtl74D3XdDHgO/sTzfYOxEJ1vd9jv7FZ8Csy/jF9q4kK',0,new Date('2018-11-12T07:30:00'));
  let u8 = await userCreate('adithya4','ad.8@gmail.com','$2b$10$dkvSgPTKxAtl74D3XdDHgO/sTzfYOxEJ1vd9jv7FZ8Csy/jF9q4kK',16,new Date('2020-11-12T07:30:00'));
  
  
  
  
  
  //USEROBJECT CREATED FIRST, THEN INSERTED INTO ANSWER AND QUESTION
  
  
  
 
  
  let c1 = await commentCreate('c1','abaya','2022-03-02T18:30:42',0);
  let c2 = await commentCreate('c2','dev','2022-03-02T20:30:42',0);
  let c3 = await commentCreate('c3','adithya','2022-03-02T22:30:42',0);
  let c4 = await commentCreate('c4','dev','2023-12-02T18:30:42',0);
  let c5 = await commentCreate('c5','dev','2023-11-08T19:30:42',0);
  let c6 = await commentCreate('c6','abaya','2023-11-01T22:30:41',0);
  
  
  let a1 = await answerCreate('abaya', 'a1', 0, [c1,c2,c3], new Date('2022-03-01T15:30:42'));
  let a2 = await answerCreate('joji','a2',0,[] ,new Date('2022-03-02T16:30:00'));
  let a3 = await answerCreate('steve', 'a3',0,[], new Date('2022-03-03T09:24:00'));
  let a4 = await answerCreate('dev', 'a4',0, [],new Date('2022-03-04T03:30:00'));
  let a5 = await answerCreate('dev', 'The best way to solve this is to do a git pull on the branch and before updating the branch ',20, [],new Date('2022-03-04T03:30:00'));
  let a6 = await answerCreate('dev', 'Teams has the ability to edit your background when on a video call. Look into the document here',10, [],new Date('2022-03-04T03:30:00'));
  let a7 = await answerCreate('dev', 'Make a post on their customer support page, the company is very responsive', 50, [],new Date('2022-03-04T03:30:00'));
  let a8 = await answerCreate('adithya', 'a5',0, [c4],new Date('2021-11-01T15:24:19'));
  let a9 = await answerCreate('AdithyaNew', 'a6',0,[c5], new Date('2021-11-01T16:24:19'));
  let a10 = await answerCreate('abaya', 'a7',0, [c6], new Date('2021-10-09T17:24:19'));
  
  await questionCreate('test q1 title','test q1 summary' , '0', 'test q1 text and descrip',0, [t1, t2],  'adithya3', new Date('2020-12-17T03:24:00'), [a1, a2,a3,a4,a5,a6], 10);
  await questionCreate('Test Question 2','test q2 summary' , '0', 'Zoom has a video issue on my Mac. Any insights on solve this problem quickly? I have alot of work to do in the coming days',0, [t3, t4, t2],  'dev', new Date('2022-03-04T03:30:00'), [a7],121);
  await questionCreate('test q3 title','test q3 summary' , '0', 'test q3 text and descrip',0,[t1, t2], 'adithya3', new Date('2020-12-17T03:24:00'),[], 10);
  await questionCreate('Test Question 5','test q4 summary' , '0', 'android studio save string shared preference, start activity and load the saved string',0,[t3, t4, t2],'dev', new Date('2020-03-01T21:08:30'), [a8],121);
  await questionCreate('test q5 title','test q5 summary' , '0', 'test q5 text and descrip',0,[t1, t2], 'adithya3', new Date('2020-12-17T03:24:00'), [a9],10);
  await questionCreate('Test Question 6','test q6 summary' , '0', 'Google Calendar has a reminder issue any comments on how to save string shared preference, start activity and load the saved string',0, [t7, t2, t1], 'dev', new Date('2021-08-01T20:09:30'), [],121);
  await questionCreate('Test Question 8' , 'test q6 summary',  '0','How to fix my Facebook chat? I have been unable to receive any messages for the last 8 hours. Is teams down?',0, [t1, t2],  'adithya', new Date('2020-12-17T03:24:00'), [a1, a2,a3,a4,a5,a6], 10);
  await questionCreate('Test Question 9', 'test q6 summary',  '0', 'WhatApp Video call glitch. I have been unable to see myself of video chats for the last week any idea on how to solve this issue?' ,0, [t3, t4, t2],  'adithya', new Date('2022-03-04T03:30:00'), [a7],121);
  await questionCreate('Test Question 10','test q6 summary', '0','How to fix my Teams chat? I have been unable to receive any messages for the last 8 hours. Is teams down?',0,[t3, t4, t2],'adithya', new Date('2020-03-01T21:08:30'), [a8],121);
  
  
  
  
  
  

  
  
  if(db) db.close();
  console.log('done');
}

populate()
  .catch((err) => {
    console.log('ERROR: ' + err);
    if(db) db.close();
  });

console.log('processing ...');
