/*********************************************************************************
 * Program developed by A2 Infosystem
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
 *
 * "Powered by A2 Infosystem".
 ********************************************************************************

    First Coded By       Changed By                Date                    Version   
*****************************************************************************************

    Basant Kumar                                  2 July 2015             MP 1.0
                             
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

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

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
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'pradeep',
  password : 'Pr@deep##',
  database : 'test'
});

/**
* Start connection then fetch records
*/
connection.connect();
connection.query('SELECT * FROM Tandc_Organization', function(err, rows){
  if (err) throw err;  
  to_data=JSON.stringify(rows);
});
connection.query('SELECT * FROM Tandc_Donor', function(err, rows){
  if (err) throw err;  
  td_data=JSON.stringify(rows);
});
connection.end();

/**
* Start routing
*/
router.get('/', function(req, res) {
    res.json({ message: "Welcome to api" });   
});

router.route('/to')

   .get(function(req, res) {

            res.json({ tc_id: to_data });
        
    });

router.route('/td')

   .get(function(req, res) {

            res.json({ tc_id: td_data });
        
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

