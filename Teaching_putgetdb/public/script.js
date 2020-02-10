$(function(){
    let name= $('#name')
    let btn= $('#btn')
    let list= $('#list')

    function update(data){
        list.empty();
        for(let i=0;i<data.length;i++)
            list.append($(`<li>${data[i].name}</li>`));
    }

    $.get('/getdata',function(data){
        update(data);
    })

    btn.click(function(){
        let val= name.val().trim();
        $.post('/save',{value:val},function(data){
            update(data);
        })

    })
})