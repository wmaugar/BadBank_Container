// dal stands for data abstraction layer, works between node server and database, to separete code and concerns
const MongoClient   = require('mongodb').MongoClient;
//const url           = 'mongodb://localhost:27017'
const url           = 'mongodb://mongo:27017'
let db ;

//connect to mongo

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    if(err){ console.log('failed to connect: ' + err);
        return;}
        // CREATE a database, define a Name;   
        db = client.db('myproject');
    console.log('Connected succesfully to db server!');
});

// function to CREATE a USER, with data from server
function create(name, email, password){
    return new Promise((resolve, reject)=>{
        const collection = db.collection('users');
        const doc =  {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result){
            err ? reject(err) : resolve(doc);
        });
    })
}
    
// function to RETURN ALL USERS
function all(){
    return new Promise((resolve, reject)=>{
        const customers = db
        .collection('users')
        .find({})
        .toArray(function(err, docs){
            err ? reject(err) : resolve(docs);
        });
    })
}

// find user account 
function find(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({ email: email })
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

// find user account
function findOne(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
}

// update - deposit/withdraw amount
function update(email, amount) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: { balance: amount } },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );
    });
}
 
module.exports = {create, all, find, findOne, update};