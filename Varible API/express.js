const express = require('express');
var mongoose = require('mongoose');
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.static('public'))



mongoose.connect('mongodb+srv://dbAdmin:K96dqJq97n9bdReT@abtestingframework-pm8cv.mongodb.net/' +
    'abTestingFrameworkDB?retryWrites=true&w=majority')
mongoose.model('components', { variant: String })

app.get('/', function (req, res) {
    mongoose.model('components').find({}, function (err, users) {
        console.log(users)
        res.send(users)
    })
});

app.listen(3000)