var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');


// used to serve static files from public directory
app.use(express.static('public'));
// use cors 
app.use(cors());
// route to create new users 
app.get('/account/create/:name/:email/:password', function (req, res){
    // else create user
    dal.create(req.params.name,req.params.email,req.params.password).
        then((user)=> {
            console.log(user);
            res.send(user);
        });
});
// route for show all accounts
app.get('/account/all', function (req, res){
    dal.all().
        then((docs) =>{
            console.log(docs);
            res.send(docs);
    });
});

app.get('/find/:email', function (req, res){
    
    dal.find(req.params.email).
        then((user)=> {
            console.log(user);
            res.send(user);
        });
});

app.get('/findOne/:email', function (req, res){
    
    dal.find(req.params.email).
        then((user)=> {
            console.log(user);
            res.send(user);
        });
});

app.get('/update/:email/:amount', function (req, res){
    
    dal.update(req.params.email, Number(req.params.amount)).
        then((user)=> {
            console.log(user);
            res.send(user);
        });
});

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);