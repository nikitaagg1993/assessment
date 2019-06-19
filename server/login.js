var MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');  
function login (req, res, MOONGO_URL) {
    const { username, password} = req.body;
    if(!username || !password) return res.send(400).send({error: 'Please enter username and password'});
    MongoClient.connect(MOONGO_URL, function (err, db) {
        db.collection("Persons").findOne({username}, function(err, result) {
            if (err) throw err;
            if (!result) return res.send('User does not exist');
            let passwordFields = result.password.split('$');
            let salt = passwordFields[0];
            let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
            if (hash === passwordFields[1]) return res.status(200).send("Login Successful");
            else return res.status(400).send({errors: ['Invalid email or password']});
            db.close();
          });
                    
    });
 };
 module.exports  =login