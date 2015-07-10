/*********************************************************************************
 * Program developed by PositiveBCS
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
 *
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
var cors = require('cors');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8282;        // set our port

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
connection.connect();
connection.query('SELECT * FROM tandc_organization', function(err, rows){
  if (err) throw err;  
  to_data=JSON.stringify(rows);
});
connection.query('SELECT tc_donor FROM tandc_donor order by td_sequence', function(err, rows){
  if (err) throw err;  
  td_data=JSON.stringify(rows);
});

connection.query('SELECT * FROM org_message1', function(err, rows){
  if (err) throw err;  
  feed_data=JSON.stringify(rows);
});
connection.end();

/**
* Start routing
*/
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


router.get('/', function(req, res) {
    res.json({ message: "Welcome to api" });   
});

router.route('/to/oct5678093672')

   .get(function(req, res) {

            res.json({ tc_id: to_data });
        
    });

router.route('/td/oct5678093672')

   .get(function(req, res) {

            res.json({ tc_id: td_data });
        
    });
router.route('/feed/oct5678093672')

   .get(function(req, res) {

            res.json({ feed_id: feed_data });
        
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

