var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var PORT=3000;
var app = express();

//bodyparser setup for POST requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//serve static
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join(__dirname, 'lib')));

app.get("/", (req,res,next)=>{
  res.sendFile(path.join(__dirname,'public','index.html'));
});

app.post("/data", (req,res,next)=>{
  var date = new Date();
  var dateStr = date.toString()
    .replace(/\s*GMT.*$/, '')
    .replace(/^\w+\s+/,'')
    .replace(/[\s:]/g,'_');
  fs.writeFile(path.join(__dirname,"data",[dateStr,req.body.name].join('-')+".json"),JSON.stringify(req.body.data),(err)=>{
    if (err) throw err;
    console.log('File written!');
  });
  res.end();
})

app.listen(PORT, ()=>{
  console.log(`Server is listening on port ${PORT}`);
});
