const express = require('express');
const app = express();
const fs = require("fs");
const https = require("https")

function readCallback (err, data) {
  if (err) {
    console.log(`Something went wrong: ${err}`);
  } else {
    console.log(`Provided file contained: ${data}`);
  }
};

app.use(express.static("public"),express.json());

app.post('/',(req, res) => {
  console.log("request recieved")
  var elementObject = req.body
  fs.readFile("log.json",(err,data)=>{
    if(err){console.log("read error:"+err)}else{
      console.log("read data:"+data)
  var arr = JSON.parse(data);
  arr.push(elementObject);
  fs.writeFile("log.json",JSON.stringify(arr),(error)=>{
    if(err){console.log("write error:"+error)}
  })
    }
  })
  res.json(elementObject)
})

app.post("/students",(req,res,next)=>{
  let newStudent = req.query;
  console.log(newStudent)
  res.status(201).send()
})

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});