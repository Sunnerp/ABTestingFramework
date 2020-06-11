const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path')
const superagent = require('superagent')
app.use(cors())
app.use(express.static('public'))
const holidays = require('./routes/holiday')
const tourists = require('./routes/tourists')
app.use('/holidays', holidays)
app.use('/tourists', tourists)


app.get('/component', function(req, res){
    superagent.get('http://localhost:2000/comp?page='+req.query.page+'&ip='+req.ip)
    .type('application/json')
    .end((error, resp)=>{
        console.log(resp)
        if(resp.body)
            res.json(resp.body)
        else
        res.end()
    })
})


app.listen(5000)