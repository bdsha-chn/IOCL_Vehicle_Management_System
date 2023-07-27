var express = require('express')

var mongoose = require('mongoose')
var bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())
app.use(express.static('template'))
app.use(bodyParser.urlencoded({
  extended:true
}))

mongoose.connect('mongodb://Localhost:27017/iocl',{
  useNewUrlParser: true,
  useUnifiedTopology:true
});

var db=mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to database"))

app.post("/Register",(req,res)=>{
  var email=req.body.email;
  var vrn=req.body.vrn;
  var vnm=req.body.vnm;
  var Dn=req.body.Dn;
  var pn=req.body.pn;

  var data= {
    "email": email,
    "vrn":vrn,
    "vnm":vnm,
    "Dn":Dn,
    "pn": pn
  }
  db.collection('driver').insertOne(data,(err,collection)=>{
    if(err){
      throw err;
    }
    console.log("Form data inserted successfully!");
  });

  return res.redirect('register.html')

})

app.get('/', (req, res)=>{
  
  res.set({"Allow-access-Allow-Origin": '*'
  })
    return res.redirect('register.html');
  }).listen(3001);

  
    console.log('Server started on port 3001');
  
  
  
