const express= require('express')
const http= require('http')

const app = express()
const server= http.createServer(app)
const io= require('socket.io')(server)

app.use('/',express.static(__dirname + '/public'));

io.on('connection',function(socket){

    console.log('connected with '+ socket.id);
    socket.emit('connected')

    socket.on('send',function(data){
        io.emit('receive',data);
    })
})

server.listen(3000,()=>{console.log('Hosted on http://localhost:3000')})