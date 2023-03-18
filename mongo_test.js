const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('Connected!');

    // CREATE a database, define a Name;   
    const dbName = 'myproject';
    const db = client.db(dbName);

    //new user
    var name = 'user' + Math.floor(Math.random()*10000);
    var email = name + '@mit.edu';

    //ADD new user to customer table
    // define a collection named 'customers
    var collection = db.collection('customers');
    // define a doc, with name and email properties
    var doc =  {name, email};
    // insert a doc in 'customers' collection.
    collection.insertOne(doc, {w:1}, function(err, result){
        console.log('Document insert');  
    });

    //READ back the content in the database
    var customers = db
        .collection('customers')
        .find()
        .toArray(function(err, docs){
            console.log('Collection:', docs);

            //clean up
            client.close();
    });
});
