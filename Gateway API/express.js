const express = require('express')
const app = express();
const superagent = require('superagent')

app.get('/comp',function(req,res){
 
    console.log(req.query.ip)
    superagent.get('http://localhost:4000/?ip=' + req.query.ip)
    .type('application/json')
    .end((error, resp)=>{
        if(resp.body.variant === 'a')
        {
            res.end()
            return
        }
        superagent.get('http://localhost:3000/?variant=' + resp.body.variant)
        .type('application/json')
        .end((error, resp)=>{
            res.json(resp.body)
        })
    })

})

app.listen(2000)