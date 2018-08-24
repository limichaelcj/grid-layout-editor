var express = require('express');
var path = require('path');

var PORT=3000;
var app = express();

//serve static
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join(__dirname, 'lib')));

app.get("/", (req,res,next)=>{
  res.sendFile(path.join(__dirname,'public','index.html'));
});

app.listen(PORT, ()=>{
  console.log(`Server is listening on port ${PORT}`);
});
