'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());
const uuidv4 = require('uuid/v4');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_SCHEMA
});

// const tasks = [
//   { id: uuidv4(), description: "Do yoga", category: "Health", completed: false },
//   { id: uuidv4(), description: "Put on laundry", category: "Housework", completed: false },
//   { id: uuidv4(), description: "Email Beckie", category: "Admin", completed: false }
// ]

// Retreives tasks
app.get('/tasks', function (req, res) {
  connection.query('SELECT * FROM `tasks` WHERE `taskCompleted` = 0', function (error, results, fields) {
    // error will be an Error if one occurred during the query
    if(error) {
      console.error("Your query had a problem with fetching tasks", error);
      res.status(500).json({errorMessage: error}); 
    }
    else {
      // Successful query 
      res.json({tasks: results});
    } 
  });
  
})

// Creates tasks
app.post('/tasks', function (req, res) {
    // Acceept info from client about what task is being created
    const taskToInsert = req.body;
    taskToInsert.taskID = uuidv4();
    // Take that information and pre-populate an SQL INSERT statement
    // Execute the statement
    connection.query('INSERT INTO `tasks` SET ?', taskToInsert, function (error, results, fields){
      if(error) {
        console.error("Your query had a problem with inserting a new task", error);
        res.status(500).json({errorMessage: error}); 
      }
      else {
        // Return info about the task that has been created to the client
        res.json({
          tasks: taskToInsert
        });
      } 
    });
});


// Updates tasks
app.put('/tasks/:taskID', function (req, res) {
  res.json({
    message: 'PUT displays task for editing by user'
  });
})

// Deletes tasks
app.delete('/tasks/:taskID', function (req, res) {
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
