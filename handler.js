'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/tasks', function (req, res) {
  //res.send('Hello World!'); - greyed out because res.json sets up headers the way we want.

  res.json({
    //message: 'Is this thing on?',
    [
      { id: uuidv4(), description: "Do yoga", category: "Health", completed: false },
      { id: uuidv4(), description: "Put on laundry", category: "Housework", completed: false },
      { id: uuidv4(), description: "Email Beckie", category: "Admin", completed: false }
    ]
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
