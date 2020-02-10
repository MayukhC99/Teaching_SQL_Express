const db= require('mysql2');

const connection= db.createConnection({
    host: 'localhost',
    user:'mayukh',
    password:'admin',
    database:'mytestdb'
})

function getdata(){
    return new Promise(function(resolve,reject){
        connection.query(
            `SELECT * FROM fname`,function(err,result,column){
                if(err)
                    reject(err);
                else
                    resolve(result);
            }
        )
    })
}

function putdata(name){
    return new Promise(function(resolve,reject){
        connection.query(
            `INSERT INTO fname (name) VALUES(?)`,
            [name],
            function(err,result,column){
                if(err)
                    reject(err)
                else
                    resolve();
            }
        );
    })
}

module.exports={getdata,putdata}