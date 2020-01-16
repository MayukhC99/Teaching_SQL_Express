const db= require('mysql2');

const connection= db.createConnection({
    host: 'localhost',
    user: 'mayukh',
    password: 'admin',
    database: 'mytestdb'
});

function getAllPersons(){
    return new Promise(function(resolve,reject){
        connection.query(`SELECT * FROM person;`,
        function(err,rows,cols){
            if(err)
                reject(err);
            else
                resolve(rows);
        })
    })
}

function putPersons(name,age){
    return new Promise(function(resolve,reject){
        connection.query(`INSERT INTO person (name,age) VALUES (?,?)`,
        [name,age],
        function(err,rows,cols){
            if(err)
                reject(err);
            else
                resolve();
        })
    })
}

module.exports={
    getAllPersons,
    putPersons
};