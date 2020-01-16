
const socket= io();

socket.on('connected',()=>{
    alert('connected '+ socket.id);
})


$(function(){
    let post_button= $('#post_button')
    let input_text= $('#input_text')
    let list= $('#list')

    post_button.click(function(){
        let msg =  input_text.val()
        
        socket.emit('send',{message:msg});

    })

    socket.on('receive',function(data){
        list.append('<li>' + data.message + '</li>');
    })
})