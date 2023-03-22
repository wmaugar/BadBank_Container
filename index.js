var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Library API",
            version: '1.0.0'
        }
    },
    apis: ['index.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.static('public'));
// use cors 
app.use(cors());


/**
* @swagger 
* /account/create/:name/:email/:password:
*    get:
*       description: route to create new users, with name, email and password.
*       responses:
*          200:
*           description: Success
*/

app.get('/account/create/:name/:email/:password', function (req, res){
    // else create user
    dal.create(req.params.name,req.params.email,req.params.password).
        then((user)=> {
            console.log(user);
            res.send(user);
        });
});
// route for show all accounts

/**
* @swagger 
* /account/all:
*    get:
*       description: route to get account information in database.
*       responses:
*          200:
*           description: Success
*/

app.get('/account/all', function (req, res){
    dal.all().
        then((docs) =>{
            console.log(docs);
            res.send(docs);
    });
});

/**
* @swagger 
* /find/:email:
*    get:
*       description: route to get a user account information, searching in database with its email.
*       responses:
*          200:
*           description: Success
*/

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

/**
* @swagger 
* /update/:email/:amount:
*    get:
*       description: route to update the balance, using email address to find user in database
*       responses:
*          200:
*           description: Success
*/


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