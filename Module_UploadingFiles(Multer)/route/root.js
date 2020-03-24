const express= require('express');
const multer= require('multer');
const path= require('path');

const route= express.Router();


//Set Storage Engine
const storage_engine = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req,file,done){
        done(null,'Image-'+Date.now()+path.extname(file.originalname));//path.extname can extract extension name from file name
    }
});

//creating fileFilter function

const customFileFilter = function(req,file,done){
    //initializing a regex for test
    const regex= /\jpg$|\jpeg$|\png$|\gif$/

    //checking filename
    const check_filename = regex.test(file.originalname);

    //checking mimetype
    const check_mimetype= regex.test(file.mimetype);

    if(check_filename && check_mimetype){
        done(null,true);
    } else {
        done('Error: Images only');
    }
}

/*
    some description about regex
    //-> every thing between / and / will be considered as regex
    . -> matches any character except the line terminators
    \w -> matches any word character (equal to [a-zA-Z0-9_])
    + -> matches between 1 and unlimited times
    * -> matches between 0 and unlimeited times
    \b -> assert position at a word boundary
    ^ -> begining with
    $ -> ends
    () -> braces used to form a group
    etc.

    methods used in javascript regex
    .test(string) -> return true or false based on the regular expression being present on the string
    .exec(string) -> extracts all group from the string according to the regular expression

    for beginner's guide to regex watch this video
    - https://www.youtube.com/watch?v=909NfO1St0A
    
    to practice regex use this 
    - https://regex101.com/
 */

//Initializing Upload
const upload = multer({
    storage: storage_engine,
    limits: {fileSize: 5000000}, 
    fileFilter: customFileFilter
}).single('image_file');


//handling post request containing the file
route.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.send(undefined);
        } else {
            if(req.file === undefined)
                res.send(undefined);
            else
                res.send('.\\uploads\\'+req.file.filename);
        }
    })


})

module.exports={
    route
}