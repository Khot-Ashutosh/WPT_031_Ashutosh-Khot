
const express = require('express');
const app = express();

app.use(express.static('abc'));
//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ashutosh',
    password: 'cdac123',
    database: 'practice',
	port:3306
});

var result;

app.get('/getdetails', function (req, res) {
    console.log("reading input ");
	let input = req.query.bookid;
	
	let output = {status:false,details:{bookid:0, name:"",price:0}}

	connection.query("select * from book where bookid = ?", [input], (err, res1) => {
        if (err) {
			//result = err;
			console.log("error occurs " + err);
		} 
		else {
            
				output.status = true;
				output.details= res1[0];
        }
		console.log(output.status);
        res.send(output);
    });

});

app.get('/updatedetails', function (req, res) {
    
	let input = {bookid:req.query.bookid,name:req.query.name,price:req.query.price};

	
	let output = false;

	connection.query("update book set price = ? where bookid=?;", [input.price,input.bookid], (err, res1) => {
        if (err) {
			//result = err;
			console.log("error occurs " + err);
		} 
		else {
				output = true;
        }
		//console.log(output.status);
        res.send(output);
    });

});


app.listen(8081, function () {
    console.log("server listening at port 8081...");
});