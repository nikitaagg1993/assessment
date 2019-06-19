var MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');  
 
function register(req,res,MOONGO_URL){
    const { username,password } = req.body;
    if(!username || !password) return res.send(400).send({error: 'Please enter username and password'});
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
                                     .update(password)
                                     .digest("base64");
    let hashPass = salt + "$" + hash;
    req.body.permissionLevel = 1;
    // Connect to the db
    MongoClient.connect(MOONGO_URL, function (err, db) {
        db.collection('Persons', function (err, collection) {
            collection.insert({username,password:hashPass});
            
        });
                    
    });
 };  
 
 module.exports = register ;