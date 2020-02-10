'use strict';
const uuidv4 = require('uuid/v4');

const serverless = require('serverless-http');
const express = require('express');
const app = express();

const tasks = [
  { id: uuidv4(), description: "Do yoga", category: "Health", completed: false },
  { id: uuidv4(), description: "Put on laundry", category: "Housework", completed: false },
  { id: uuidv4(), description: "Email Beckie", category: "Admin", completed: false }
]

app.get('/tasks', function (req, res) {
  //res.send('Hello World!'); - greyed out because res.json sets up headers the way we want.
  res.json({
    //message: 'Is this thing on?',
    tasks: tasks
  });
})

app.post('/tasks', function (req, res) {
  res.json({
    message: 'POST user submitted task to the list of tasks on the page'
  });
})

app.put('/tasks', function (req, res) {
  res.json({
    message: 'PUT displays task for editing by user'
  });
})

app.delete('/tasks', function (req, res) {
  res.json({
    message: 'DELETE task from task list'
  });
})

module.exports.tasks = serverless(app);


// module.exports.tasks = async event => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Hi James, thanks for answering queries on your Sunday!'
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };
