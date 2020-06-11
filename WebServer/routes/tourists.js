const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbAdmin:nTAPS3eR8MVSRm0T@datavis-zsrtz.mongodb.net/datavis?retryWrites=true&w=majority";
let db;
MongoClient.connect(uri, function(err, database) {
  if(err) throw err;

  db = database;
})

router.get('/' ,function(req, res) {
  let city = ""
  if(req.query.city !== undefined){
    city = req.query.city.toLowerCase();
    if(db)
      db.db('datavis').collection('tourists').findOne({location: city}, function(err,results) {
        res.send(results)
      })

  }else{
    if(db)
      db.db('datavis').collection('tourists').find({}).toArray(((error, result) => {
        res.send(result)
      }))
  }


})

module.exports = router;
