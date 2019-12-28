const express= require('express');
const db= require('./db');

const server= express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use('/',express.static(__dirname+'/public'));

server.use('/indexpage',(req,res,next)=>{res.sendFile(__dirname+"/public/index.html")});

server.get('/add',function(req,res){
    res.sendFile(__dirname+'/public/addperson.html'); //sendFile can send html page, while redirect can make get request to a particular link
});

server.get('/update',function(req,res){
    console.log('I am in get');
    db.getAllPersons()
    .then(function(data){
        res.send(data);
    })
    .catch(function(err){
        res.send({error:err});
    })
});

server.post('/update',function(req,res){
    db.putPersons(req.body.name,req.body.age)
    .then(function(){
        console.log('I am in post')
        res.redirect(307,'/update');
    })
    .catch(function(err){
        res.send({error:err});
    })
})

server.use((req,res,next)=>{res.send(`<h1>Error 404 Page not found</h1>`)});

server.listen(1000);