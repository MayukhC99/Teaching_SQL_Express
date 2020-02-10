const express= require('express')
const app= express()
const path= require('path')
const db= require('./database')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/',express.static(path.join(__dirname,'public')));

app.get('/data',function(req,res){
    str=""+ __dirname+"/public/form.html";
    res.sendFile(str);
})

app.get('/getdata',function(req,res){
    console.log('Iam in get')
    db.getdata()
    .then(function(result){
        res.send(result);
    })
    .catch(function(err){
        throw err;
    })
})


app.post('/save',function(req,res){
    db.putdata(req.body.value)
    .then(function(){
        console.log('Iam in post')
        res.redirect('/getdata')
    })
    .catch(function(err){
        throw err;
    })
})

app.listen(1000,function(){
    console.log('Your service has been started at http://localhost:1000');
})