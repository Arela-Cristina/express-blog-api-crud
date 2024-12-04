console.log("Hello");
//STEP 1
const express = require("express"); //import
const { posts } = require("./data/data_base.js"); //import from ...
const postsRouter = require("./routers/router.js"); //import from 
const cors = require ("cors")
const app = express(); // istanza = app
const port = 1311; // #porta


app.use(cors());
app.use(express.static("public_assets")); //set middleware using ".use" prop
app.use(express.json()) //set middleware per parsare il body in JSON del nuovo elemento della store

//STEP 3
app.get("/", (req, res) => {
  console.log("Server del mio nuovo blog");
  res.send("Benvenuto al server del mio nuovo blog");
});

//STEP 5
app.use("/posts", postsRouter); //collegamento router

//STEP 2
app.listen(port, () => {
  console.log(`server in ascolto http://localhost:${port}`);
});
