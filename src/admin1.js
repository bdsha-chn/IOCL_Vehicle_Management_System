const express = require("express");
const app = express();
const path = require("path");
const {collection,collection1} = require("./mongodb");
const bodyParser = require('body-parser');
const authRoutes = require("./auth"); 
const session = require("express-session"); 

app.use(bodyParser.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, "../template");
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname,"../public")));
app.use(express.static(path.join(__dirname, "../template")));
app.use("/auth", authRoutes);
app.use(express.json());
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false })
); 
app.use(
  session({
    secret: "secret123", 
    resave: false,
    saveUninitialized: true
  })
);
app.get("/", (req, res) => {
  res.render("home"); 
});

app.get("/home", (req, res) => {
  res.render("home", { isSignedIn: req.session.isSignedIn || false }); 
});
app.get("/table",(req,res)=>{
  res.render("table.html");
});
app.get("/register_admin", (req, res) => {
  res.render("register_admin");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/Register",(req,res)=>{
  res.render("register");
});

/*
// Load "map.html" page when accessing "/map"
app.get("/map", (req, res) => {
  res.sendFile(path.join(__dirname, "../template/map.html"));
});
*/
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/home");
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ email: req.body.email });
    if (check.password === req.body.password) {
      req.session.isSignedIn = true;  
      res.render("home", { isSignedIn: true }); 
      console.log("Password match");
    } else {
      res.send("Incorrect password");
    }
  } catch {
    res.send("Wrong Details");
  }
})
/*

// API endpoint to handle adding coordinates (POST request)
const markers = [];
app.post("/addMarker", (req, res) => {
  const latitude = parseFloat(req.body.latitude);
  const longitude = parseFloat(req.body.longitude);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: "Please enter valid latitude and longitude coordinates." });
  }

  const marker = { lat: latitude, lng: longitude };
  markers.push(marker);
  res.status(200).json({ message: "Marker added successfully." });
});

// API endpoint to retrieve markers (GET request)
app.get("/getMarkers", (req, res) => {
  res.status(200).json(markers);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../template/map.html"));
});
*/

app.post("/Register",async(req,res)=>{
  const data={email:req.body.email,
   vrn:req.body.vrn,
   vnm:req.body.vnm,
   Dn:req.body.Dn,
   pn:req.body.pn,
  };
  
    await collection1.insertMany([data]);
    res.redirect("/home"); 
  }); 

app.post("/signup", async(req, res) => {
  const data1 = {
    email: req.body.email,
    password: req.body.password,
  };

  await collection.insertMany([data1]);

  res.render("home");  
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ email: req.body.email });
    if (check.password === req.body.password) {
      res.render("Register");
      console.log("Password match")
    } else {
      res.send("Incorrect password");
    }
  } catch {
    res.send("Wrong Details");
  }
});



app.listen(3001, () => {
  console.log("server started on port 3001");
});
