const express = require('express');
const app = express();
const port = process.env.port || 5000
const path = require('path');
const fs = require('fs')



app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname , 'public')))




app.get('/', (req,res)=>{
    fs.readdir('./files',function(err,files){   
     res.render('index', {files: files});
    })

});

app.get('/file/:filename', (req,res)=>{
    const filename = `./files/${req.params.filename}`
    fs.readFile(filename, "utf-8", function(err, filedata){
        res.render('show', {filename: req.params.filename, filedata: filedata})
    
    })
})

app.post('/create', function(req,res){
    const filename = req.body.title.split(' ').join('') + '.txt';
    const filepath = `./files/${filename}`
    fs.writeFile(filepath, req.body.details, function(err){
        if(err){
            console.log(err);
            res.status(500).send('some error ')
        }
      
    });
    res.redirect('/');
    
  
});

app.listen(port, ()=>{
    console.log('server started');
})