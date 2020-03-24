const express= require('express');
//const multer= require('multer');
const path= require('path');

const app = express();
const port= process.env.PORT || 8000;

app.use(express.static(path.join(__dirname,'public')));
app.use('/root',require('./route/root').route);

app.listen(port,()=>console.log('Hosted on http://localhost:8000'));