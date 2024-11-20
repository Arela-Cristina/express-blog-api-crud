console.log("Hello");
//STEP 1
const express = require("express"); //import

const { posts } = require("./data_base.js"); //import from ... 
const app = express(); // istanza = app
const port = 1311; // #porta

//STEP 3
app.get("/", (req, res) => {
  console.log("Server del mio nuovo blog");
  res.send("Benvenuto al server del mio nuovo blog");
});

//STEP 2
app.listen(port, () => {
  console.log(`server in ascolto http://localhost:${port}`);
});
