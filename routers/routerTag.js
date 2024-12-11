const express = require("express"); //import
const router = express.Router();

const controller = require('../controllers/controllerTag');

router.get('/', controller.index);

module.exports = router;