const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path')
var mongoose = require('mongoose');
var mongo = require('mongodb')
var assert = require('assert')
app.use(cors())
app.use(express.static('public'))
mongoose.connect('mongodb+srv://dbAdmin:K96dqJq97n9bdReT@abtestingframework-pm8cv.mongodb.net/' +
'abTestingFrameworkDB?retryWrites=true&w=majority')
const variantModel = mongoose.model('variants', {ip:String, variant: String })

app.get('/', function (req, res){

    getIpVariant(req.query.ip, function(err, user){
        if(err) throw err;

        console.log(user)
        if(user){
            res.send(user)
        }else{
            let variant = randomiser()
            addIP(req.query.ip,variant.variant)
            res.send(variant)
        }
        
    })
})

function getIpVariant(ip, variantCallBack){
   variantModel.findOne({ip:ip}, variantCallBack)
}

function addIP(ip , variant){
    var newSchema = {
        ip : ip,
        variant : variant
    };

   
    variantModel.create(newSchema)
}

async function getSplitAmount(){
    await mongoose.model('bPercentage').findOne({}, function (err, users){
        return user
    })
}

function randomiser(){
    
    var number = Math.random()
    if (number > getSplitAmount()){ 
       return {
           variant: 'a'
       }
    }else{
        return{
            variant: 'b'
        }
    }
}

app.listen(4000)