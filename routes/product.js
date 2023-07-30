const express = require("express");
const router = express.Router();
const {heartbeat, create, update, remove, fetch, signUp, signIn, authenticate} = require("../controllers/product");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


router.route("/heartbeat").get(heartbeat);

router.route("/insert").post(jsonParser,create);
router.route("/update").put(jsonParser,update);
router.route("/delete/:product_name").delete(jsonParser,remove);
router.route("/fetch").post(jsonParser,fetch);

router.route("/sign-up").post(jsonParser,signUp);
router.route("/sign-in").post(jsonParser,signIn);
router.route("/authenticate").get(jsonParser,authenticate);



module.exports = router;
