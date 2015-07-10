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
 /**
 * Call  dependencies
 */
var express = require('express');
var router = express.Router();
 /**
 * Connect to mysql database
 */
var result='';
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

connection.query('SELECT * FROM term_conditions', function(err, rows){
  if (err) throw err;
  
  result=JSON.stringify(rows);

});

connection.end();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: result });
});

module.exports = router;



