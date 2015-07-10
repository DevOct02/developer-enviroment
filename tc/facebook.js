/*********************************************************************************
 * Program developed by Positivebcs
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *
 * 
 * 
 * 
 *
 * "Powered by Positivebcs".
 ********************************************************************************

    First Coded By       Changed By                Date                    Version   
*****************************************************************************************

    Basant Kumar                                  8 July 2015             MP 1.0
                             
/******************************************************************************************/

// server.js

// BASE SETUP
// =============================================================================

/**
* Call  dependencies
*/
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8083;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)


// mysql database connectivity
// middleware to use for all requests

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');  //Testing message in console
    next(); // make sure we go to the next routes and don't stop here
});

/**
* Connect to mysql database
*/
var to_data="";
var td_data="";
var feed_data="";
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'nodejs.cpxficcbza5z.us-east-1.rds.amazonaws.com',
  user     : 'root',
  password : 'server123',
  database : 'octant'
});

/**
* Start connection then fetch records
*/

var url = 'https://graph.facebook.com/1583763428557487/feed?access_token=124470094554223|LQ_MbkoI0oSMNZgGcv8DQKzWQQ8';

https.get(url, function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
        var fbResponse = JSON.parse(body);
        var count = Object.keys(fbResponse['data']).length;
       connection.connect();
       connection.query('DELETE FROM org_message1 WHERE msg_type_id=9', function (err, result) { 
})

       for(var i = 0; i < count; i++) {
       var picture=fbResponse['data'][i]['picture'];
        if(picture == null){ picture=''; }
       var message=fbResponse['data'][i]['message'];
        if(message == null){ message=''; }
      
     var post  = {org_id:'', msg_type_id:'9', event_date:'', event_time:'', event_link:'', event_location:'', pic:picture, start_date:'',end_date:'', message_title:'', content:message};

     var query = connection.query('INSERT INTO org_message1 SET ?', post, function(err, result) {
               
          });
              // console.log(query.sql); 

           }  
connection.end();
        });

}).on('error', function(e) {
      console.log("Got error: ", e);
});


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

