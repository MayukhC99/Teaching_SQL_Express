$(function(){
    let name= $('#name');
    let age= $('#age');
    let submit= $('#submit');
    let table= $('#person_table');

    function putdata(data){
        table.empty();
        table.append(`<tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
        </tr>`);

        for(let i=0;i<data.length;i++){
            table.append(`<tr>
            <td>${data[i].id}</td>
            <td>${data[i].name}</td>
            <td>${data[i].age}</td>
        </tr>`);
        }
    }

    /*$.get('./update',function(data){
        putdata(data);
    })*/

    submit.click(function(){
        let na= $.trim(name.val());
        let ag= $.trim(age.val());
        if(na!="" && ag!=""){
            $.post(`./update`,
            {
                name:na,
                age:ag
            }, function(data){
                console.log('Iam in post script');
                putdata(data);

                //alert(__dirname+"/indexpage");
                //$.get('./indexpage');
                //window.location.replace("www.google.com");
            })
        }
        else{
            alert(`fill up properly`);
            na.val("");
            ag.val("");
        }
    })
})