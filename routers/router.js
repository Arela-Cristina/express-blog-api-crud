const express = require("express"); //import
const router = express.Router(); //funzione Router () pressa da express
const { posts } = require("../data_base.js"); //import posts from data_base.js
const routerController = require("../controllers/controller.js"); //import  from controller.js
console.log(routerController);
//CRUDE

//index
router.get("/", routerController.index);

//show
router.get("/:id", routerController.show);

//store
router.post("/", routerController.store);

//update
router.put("/:id", routerController.update);

//modify
router.patch("/:id", routerController.patch);

//deleted
router.delete("/:id", routerController.destroy);

module.exports = router; // export router
