const express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
console.log(MongoClient);
var url = "mongodb://localhost:27017/";
const app = express();
const path = require('path');
var data;
var logind;
var db1;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('path'));
app.use('/Et.png', express.static('Et.png'))
app.use(bodyParser.urlencoded({
    extended: true
}));

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db1 = db.db("credentials");
    console.log("Database Connected");
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/Start_page.html'));
});

app.get('/loginpage.html', function(req, res) {
    res.sendFile(path.join(__dirname + "/loginpage.html"));
});

/*app.post('/loginPage', function(req, res) {
    console.log("req", req)
    var loginData = { username: req.body.uname, Password: req.body.pname };
    // var loginData = { username: "test1123", Password: "123456" };
    console.log("loginData", loginData)
});*/

app.post('/login_Page', function(req, res) {
    console.log("req", req)
    var loginData = { username: req.body.uname, Password: req.body.pname };
    // var loginData = { username: "test1123", Password: "123456" };
    console.log("loginData", loginData)
    db1.collection('details').findOne(loginData, function(err, result) {
        console.log("result 0", result);
        if (err) throw err;
        if (result === null) {
            console.log("result 1", result);
            return res.redirect('loginpage.html');
        } else {
            console.log("result 2", result);
            return res.redirect('success.html');
        }
    });
});


app.get('/regis.html', function(req, res) {
    res.sendFile(path.join(__dirname + "/regis.html"));
});

app.post('/sign_up', function(req, res) {
    data = { username: req.body.username, email: req.body.email, Password: req.body.passid };
    console.log("loginData", data)

    db1.collection('details').insertOne(data, function(err, result) {
        if (err) throw err;
        console.log("credentials saved!");
    });
    console.log(data);
    return res.redirect('loginpage.html');
});



app.get('/success.html', function(req, res) {
    res.sendFile(path.join(__dirname + "/success.html"));
});

app.listen(8080, function() {
    console.log("listening to 8080");
});