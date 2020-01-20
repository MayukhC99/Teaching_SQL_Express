const express= require('express');
const db= require('./db');
const path= require('path')

const server= express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use('/',express.static(__dirname+'/public'));

server.get('/indexpage',(req,res)=>{
   
    res.sendFile(path.join(__dirname,'public/index.html'))
    console.log(path.join(__dirname,'public/index.html'))
});

server.get('/add',function(req,res){
    res.sendFile(__dirname+'/public/addperson.html'); //sendFile can send html page, while redirect can make get request to a particular link
});

server.get('/update',function(req,res){
    console.log('I am in get');
    db.getAllPersons()
    .then(function(data){
        console.log('send');
        res.send(data);
    })
    .catch(function(err){
        res.send({error:err});
    })
});

server.post('/update',function(req,res){
    db.putPersons(req.body.name,req.body.age)
    .then(function(){
        
        res.redirect('/update');
        console.log('I am in post')
    })
    .catch(function(err){
        console.log('error catched '+err);
        res.send({error:err});
    })
})

server.use((req,res,next)=>{res.send(`<h1>Error 404 Page not found</h1>`)});

server.listen(1000,()=>{console.log('http://localhost:1000')});